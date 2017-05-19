# ember-cli-markdown-templates

This addon allows you to use [Markdown](http://daringfireball.net/projects/markdown/) format
to write templates in your Ember applications. This can be useful for help sections,
documentation, etc.

Once this addon is installed, you can just place templates written in Markdown into the usual
template locations as files with `.md` or `.markdown` extension. These templates will be converted
to the regular '.hbs' format at the build time. Actually, you can even use HTMLBars helpers in your
Markdown templates.

To convert Markdown templates, this addon uses the [Showdown](https://github.com/showdownjs/showdown)
library.

## Installation

* `ember install ember-cli-markdown-templates`

## Ember-CLI support

Tested with Ember-CLI 2.11. Should be compatible at least with Ember-CLI 2.4 and above,
maybe with older versions too.
