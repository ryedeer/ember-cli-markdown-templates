'use strict';

var Filter = require('broccoli-filter');
var Showdown = require('showdown');
var converter = new Showdown.Converter();

function MarkdownCompiler (inputTree, options) {
  if (!(this instanceof MarkdownCompiler)) {
    return new MarkdownCompiler(inputTree, options);
  }

  Filter.call(this, inputTree, options);
}


MarkdownCompiler.prototype = Object.create(Filter.prototype);
MarkdownCompiler.prototype.constructor = MarkdownCompiler;
MarkdownCompiler.prototype.extensions = ['md', 'markdown'];
MarkdownCompiler.prototype.targetExtension = 'hbs';

MarkdownCompiler.prototype.processString = function (string, relativePath) {
  return converter.makeHtml(string);
}


module.exports = {
  name: 'ember-cli-markdown-templates',

  setupPreprocessorRegistry: function(type, registry) {
    var compiler = {
      name: 'ember-cli-markdown-templates',
      ext: ['md', 'markdown'],
      toTree: function(tree) {
        return MarkdownCompiler(tree, {});
      }
    };
    registry.add('template', compiler);
  }
};
