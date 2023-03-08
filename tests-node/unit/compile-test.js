'use strict';

// eslint-disable-next-line node/no-unpublished-require
const QUnit = require('qunitjs'),
  test = QUnit.test,
  testModule = QUnit.module;
const compileMarkdown = require('../../lib/compile-markdown');

testModule('Unit | Markdown Compiler');

test('should compact code with yield', function (assert) {
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
  <CodeSnippet @name="foo/bar.txt"/>

<p>  Second paragraph:</p>
  <Tabs as |tabs|>
    <tabs.Page @title="template.hbs">
      <CodeSnippet @name="template.hbs" />
    </tabs.Page>

 <tabs.Page @title="component.ts">
  <CodeSnippet @name="component.ts" />
</tabs.Page>   </Tabs>

<h3 id="another-h3">Another h3</h3>`;

  assert.equal(compiled, html);
});

test('should compact code with yield and inline html in paragraph', function (assert) {
  const code = `
  ### Sample h3

  Some text

  <CodeSnippet @name="foo/bar.txt"/>

  Second <i>para</i>graph with a little more
  text and a line break. Additionally, there is also
  a <LinkTo @route="to.the.house">link</LinkTo> embedded
  into it.

  <References class="references" as |l|>
    <l.BlogPost
      @title="Ember 2019: Reduce Complexity"
      @year="2019"
      @url="https://gos.si/blog/ember-2019-reduce-complexity"
    as |r|>
      <r.Author @given="Thomas" @family="Gossmann"/>
    </l.BlogPost>
  </References>

  ### Another h3
  `;
  const compiled = compileMarkdown(code, {});

  const html = `<h3 id="sample-h3">Sample h3</h3>
<p>  Some text</p>
  <CodeSnippet @name="foo/bar.txt"/>

<p>  Second <i>para</i>graph with a little more
  text and a line break. Additionally, there is also
  a <LinkTo @route="to.the.house">link</LinkTo> embedded
  into it.</p>
  <References class="references" as |l|>
    <l.BlogPost
      @title="Ember 2019: Reduce Complexity"
      @year="2019"
      @url="https://gos.si/blog/ember-2019-reduce-complexity"
    as |r|>
      <r.Author @given="Thomas" @family="Gossmann"/>
    </l.BlogPost>
  </References>

<h3 id="another-h3">Another h3</h3>`;

  assert.equal(compiled, html);
});

test('should compact paragraphs without yield', function (assert) {
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
  <CodeSnippet @name="foo/bar.txt"/>

<p>  Second paragraph:</p>
  <Tabs>
    Tab content
  </Tabs>

<h3 id="another-h3">Another h3</h3>`;

  assert.equal(compiled, html);
});
