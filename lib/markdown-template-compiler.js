'use strict';

const stew = require('broccoli-stew');
const compileMarkdown = require('./compile-markdown');

module.exports = class MarkdownTemplateCompiler {
  constructor(options) {
    this.name = 'markdown-template-compiler';
    this.ext = ['md', 'markdown'];
    this.options = options || {};
  }

  toTree(tree) {
    let compiled = stew.map(tree, `**/*.{${this.ext}}`, (string) =>
      compileMarkdown(string, this.options)
    );

    return stew.rename(compiled, '.md', '.hbs');
  }
};
