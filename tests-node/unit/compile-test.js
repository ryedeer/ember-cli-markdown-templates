'use strict';

const QUnit = require('qunitjs'),
  test = QUnit.test,
  testModule = QUnit.module;
const compileMarkdown = require('../../lib/compile-markdown');

testModule('Unit | Markdown Compiler');

test('should compact code with yield', function(assert) {
  const code = `
  ### Sample h3

  Some text

  <CodeSnippet @name="foo/bar.txt"/>

  Second paragraph:

  <Tabs as |tabs|>
    <tabs.Page @title="template.hbs">
      <CodeSnippet @name="template.hbs" />
    </tabs.Page>

    <tabs.Page @title="component.ts">
      <CodeSnippet @name="component.ts" />
    </tabs.Page>
  </Tabs>

  ### Another h3
  `;
  const compiled = compileMarkdown(code, {});

  const html = `<h3 id="sample-h3">Sample h3</h3>
<p>  Some text</p>
<p>  <CodeSnippet @name="foo/bar.txt"/></p>
<p>  Second paragraph:</p>
<p>  <Tabs as |tabs|>
    <tabs.Page @title="template.hbs">
      <CodeSnippet @name="template.hbs" />
    </tabs.Page> <tabs.Page @title="component.ts">
  <CodeSnippet @name="component.ts" />
</tabs.Page>   </Tabs>

</p>
<h3 id="another-h3">Another h3</h3>`;

  assert.equal(compiled, html);
});

test('should compact paragraphs without yield', function(assert) {
  const code = `
  ### Sample h3

  Some text

  <CodeSnippet @name="foo/bar.txt"/>

  Second paragraph:

  <Tabs>
    Tab content
  </Tabs>

  ### Another h3
  `;

  const compiled = compileMarkdown(code, {});

  const html = `<h3 id="sample-h3">Sample h3</h3>
<p>  Some text</p>
<p>  <CodeSnippet @name="foo/bar.txt"/></p>
<p>  Second paragraph:</p>
  <Tabs>
    Tab content
  </Tabs>

<h3 id="another-h3">Another h3</h3>`;

  assert.equal(compiled, html);
});
