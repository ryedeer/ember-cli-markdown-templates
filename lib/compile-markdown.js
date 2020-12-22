'use strict';

const marked = require('marked');
const highlightjs = require('highlightjs');
const fm = require('front-matter');
const HBSRenderer = require('./hbs-renderer');

const DEFAULTS = {
  targetHandlebars: true,
  wrapper: false,
  linkifyHeadings: false,
  syntaxHighlight: false,
  markedOptions: {}
};

module.exports = function compileMarkdown(source, config) {
  const content = fm(source);

  const lexer = new marked.Lexer();
  let rules = lexer.rules.html.source || lexer.rules.html;
  rules = rules.replace(
    '|<![A-Z][\\s\\S]*?>\\n*',
    '|</?([A-Z][a-zA-Z.]+)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)'
  );
  lexer.rules.html = new RegExp(rules, 'i');
  let tokens = lexer.lex(content.body);

  // we need to use marked.defaults to preserve marked default options
  let markedOptions = Object.assign(marked.defaults, config.markedOptions);
  config = Object.assign(DEFAULTS, config);

  // allow user to pass in a custom renderer
  // otherwise use default one
  if (!config.markedOptions.renderer) {
    markedOptions.renderer = new HBSRenderer(config);
  }

  if (config.syntaxHighlight) {
    markedOptions.highlight = highlight;
  }

  if (config && config.targetHandlebars) {
    tokens = compactParagraphs(tokens);
  }

  let html = marked.parser(tokens, markedOptions).trim();

  if (config.wrapper) {
    if (
      typeof config.wrapper !== 'string' ||
      config.wrapper.indexOf('{{html}}') === -1
    ) {
      throw new Error(
        'ember-cli-markdown-templates the passed in `wrapper` config is either not a string or does not have a {{html}} substring'
      );
    }
    html = config.wrapper.replace('{{html}}', html);
  }

  content.html = html;

  if (config.format) {
    html = config.format(content);
  }

  return html;
};

function highlight(code, lang) {
  if (lang) {
    return highlightjs.highlight(lang, code).value;
  } else {
    return highlightjs.highlightAuto(code).value;
  }
}

// Whitespace can imply paragraphs in Markdown, which can result
// in interleaving between <p> tags and block component invocations,
// so this scans the Marked tokens to turn things like this:
//    <p>{{#my-component}}<p>
//    <p>{{/my-component}}</p>
// Into this:
//    <p>{{#my-component}} {{/my-component}}</p>
function compactParagraphs(tokens) {
  let compacted = [];

  compacted.links = tokens.links;

  let balance = 0;
  for (let token of tokens) {
    if (balance === 0) {
      compacted.push(token);
    } else if (token.text) {
      let last = compacted[compacted.length - 1];
      last.text = `${last.text} ${token.text}`;
    }

    let tokenText = token.text || '';
    let textWithoutCode = tokenText.replace(/`[\s\S]*?`/g, '');

    // curly components
    balance += count(/{{#/g, textWithoutCode);
    // angle-bracket components
    balance += count(/<[A-Z][a-zA-Z0-9]*[^<>]+[^/>]>/g, textWithoutCode);
    // yielded angle-bracket components (containing a dot)
    balance += count(/<[a-zA-Z]+\.[a-zA-Z]+[^<>]+[^/>]>/g, textWithoutCode);

    // curly components
    balance -= count(/{{\//g, textWithoutCode);
    // angle-bracket components
    balance -= count(/<\/[A-Z][a-zA-Z0-9]*[^<>]+[^/>]>/g, textWithoutCode);
    // yielded angle-bracket components (containing a dot)
    balance -= count(/<\/[a-zA-Z]+\.[a-zA-Z]+[^<>]+[^/>]>/g, textWithoutCode);
  }

  return compacted;
}

function count(regex, string) {
  let total = 0;
  while (regex.exec(string)) total++;
  return total;
}


