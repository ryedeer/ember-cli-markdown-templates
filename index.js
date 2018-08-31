'use strict';

module.exports = {
  name: 'ember-cli-markdown-templates',

  /**
   * Default configuration for this addon.
   * Augments the applications configuration settings.
   * Object returned from this hook is merged with the application's configuration object.
   * Application's configuration always take precedence.
   */
  config() {
    return {
      'ember-cli-markdown-templates': {
        targetHandlebars: true,
        wrapper: false,
        linkifyHeadings: false,
        syntaxHighlight: false,
        markedOptions: {}
      }
    };
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      let options = this.app.options['ember-cli-markdown-templates'];
      let TemplateCompiler = require('./lib/markdown-template-compiler');
      registry.add('template', new TemplateCompiler(options));
    }
  }
};
