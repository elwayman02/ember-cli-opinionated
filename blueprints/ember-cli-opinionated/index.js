module.exports = {
  description: 'Set up additional packages for Ember apps',
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function(options) {
    return this.addAddonsToProject({
      packages: [
        'ember-cli-blanket',
        'ember-cli-sass-pods',
        'ember-cpm',
        'ember-feature-flags',
        'ember-metrics',
        'ember-moment',
        'ember-responsive',
        'ember-suave'
      ]
    });
  }
};
