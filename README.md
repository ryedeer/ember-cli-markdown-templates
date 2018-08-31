# ember-cli-markdown-templates

This addon allows you to use [Markdown](http://daringfireball.net/projects/markdown/) format
to write templates in your Ember applications. This can be useful for help sections,
documentation, etc.

Once this addon is installed, you can just place templates written in Markdown into the usual
template locations as files with `.md` or `.markdown` extension. These templates will be converted
to the regular '.hbs' format at the build time. Actually, you can even use HTMLBars helpers in your
Markdown templates.

To convert Markdown templates, this addon uses the [Marked](https://github.com/markedjs/marked)
library.

## Installation

* `ember install ember-cli-markdown-templates`

## Options

You can configure ember-cli-markdown-templates by specifying some options on your `ember-cli-build.js`
file. Example:

```js
'ember-cli-markdown-templates': {
  wrapper: '<div class="markdown">{{html}}</div>',
  syntaxHighlight: true,
  linkifyHeadings: true,
  markedOptions: {
    headerPrefix: 'header-'
  }
}
```

Options:

- `wrapper` - defaults to `false` - use this option to specify some wrapper html around the result of the markdown parsing. ember-cli-markdown-templates
will replace the string `{{html}}` with the html result of marked. This is sometimes useful to target styles to generated html.
- `syntaxHighlight` - defaults to `false` - if you set this to `true` ember-cli-markdown-templates will use HighlightJS to generate the code blocks.
- `linkifyHeadings` - defaults to `false` - ember-cli-markdown-templates can wrap headings text in an anchor tag with the same id as the `<hX>` tag itself.
This can be useful for navigation. Specify `true` to linkify all heading levels, or a number to only linkify **after** that level. e.g `linkifyHeadings: 3` will only linkify header `<h3>` levels and above.
- `markedOptions` - defaults to `{}` - you can customize the underlying marked parser by passing [any supported marked options](https://marked.js.org/#/USING_ADVANCED.md#options) in this hash.

## Syntax Higlighting Styles

ember-cli-markdown-templates *does not include* any highlight.js styles, even if you specify `syntaxHighlight: true`.
You can include them yourself in any way, either making your own theme in your app styles or importing one of the bundled themes in your
`ember-cli-build.js`. E.g:

```js
app.import('node_modules/highlightjs/styles/default.css');
```

Keep in mind that your final app will not have any highlight.js javascript included. All of the syntax highlighting
is done on node at build time and then converted to a normal hbs template. This is great because it won't
impact the build size and loading times of your app.

## Ember-CLI support

Tested with Ember-CLI 2.11. Should be compatible at least with Ember-CLI 2.4 and above,
maybe with older versions too.
