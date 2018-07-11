import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance: Application Render Test', function(hooks) {
  setupApplicationTest(hooks);

  test('rendering a markdown template', async function(assert) {
    assert.expect(2);

    await visit('/');

    assert.dom('h1#hello').hasText("Hello!");
    assert.equal(this.element.querySelector('h1#hello ~ p').innerHTML, "This is <code>ember-cli-markdown-templates</code>.");
  });
});
