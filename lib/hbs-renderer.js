const marked = require('marked');

module.exports = class HBSRenderer extends marked.Renderer {
  constructor(config) {
    super();
    this.config = config || {};
  }

  codespan() {
    return this._processCode(super.codespan.apply(this, arguments));
  }

  code() {
    return this._processCode(super.code.apply(this, arguments));
  }

  // Unescape markdown escaping in general, since it can interfere with
  // Handlebars templating
  text() {
    let text = super.text.apply(this, arguments);
    if (this.config.targetHandlebars) {
      text = text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;|&#34;/g, '"')
        .replace(/&apos;|&#39;/g, "'");
    }
    return text;
  }

  // paragraph(text) {
  //   console.log('PARAGRAPH', text);
  // }

  // link(href, title, text) {
  //   console.log('LINK', href, title, text);
  // }

  // Escape curlies in code spans/blocks to avoid treating them as Handlebars
  _processCode(string) {
    if (this.config.targetHandlebars) {
      string = this._escapeCurlies(string);
    }

    return string;
  }

  _escapeCurlies(string) {
    return string.replace(/{{/g, '&#123;&#123;').replace(/}}/g, '&#125;&#125;');
  }

  heading(text, level) {
    let linkifyHeadings = this.config.linkifyHeadings;

    if (linkifyHeadings) {
      let sinceLevel =
        typeof linkifyHeadings === 'boolean' ? 1 : this.config.linkifyHeadings;

      let id =
        this.options.headerPrefix +
        text
          .toLowerCase()
          .replace(/<\/?.*?>/g, '')
          .replace(/[^\w]+/g, '-');
      let inner = level < sinceLevel ? text : `<a href="#${id}">${text}</a>`;

      return `
        <h${level} id="${id}">${inner}</h${level}>
      `;
    } else {
      return super.heading.apply(this, arguments);
    }
  }
};
