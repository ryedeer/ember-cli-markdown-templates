'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      let options = this.app.options['ember-cli-markdown-templates'];
      let TemplateCompiler = require('./lib/markdown-template-compiler');
      registry.add('template', new TemplateCompiler(options));
    }
  },
};
