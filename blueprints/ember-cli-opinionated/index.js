module.exports = {
  description: 'Set up additional packages for Ember apps',
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function(options) {
    var packages = [
      'ember-cli-autoprefixer',
      'ember-cli-blanket',
      'ember-cli-sass-pods',
      'ember-cpm',
      'ember-feature-flags',
      { name: 'ember-metrics', target: '0.1.5' },
      'ember-moment',
      'ember-responsive',
      'ember-suave'
    ];

    if (typeof this.addAddonsToProject === 'function') { // newer versions of ember-cli
      return this.addAddonsToProject({
        packages: packages
      });
    }
    return packages.reduce(function (prev, pkg, index) {
      if (index === 1) {
        prev = this.addAddonToProject(prev);
      }
      return prev.then(this.addAddonToProject(pkg));
    }.bind(this));
  }
};
