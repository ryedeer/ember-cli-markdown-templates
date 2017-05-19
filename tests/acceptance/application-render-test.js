import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Application Render Test', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('rendering a markdown template', function(assert) {
  assert.expect(2);

  visit('/');

  andThen(function() {
    assert.equal(Ember.$('h1#hello').html(),"Hello!");
    assert.equal(Ember.$('h1#hello ~ p').html(), "This is <code>ember-cli-markdown-templates</code>.");
  });
});
