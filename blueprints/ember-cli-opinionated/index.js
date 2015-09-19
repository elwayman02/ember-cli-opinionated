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

    var updatePrompt = {
      type: 'confirm',
      name: 'answer',
      choices: [
        { key: 'y', name: 'Yes', value: 'yes' },
        { key: 'n', name: 'No', value: 'no' }
      ]
    };

    updatePrompt.message = 'Would you like to enhance your ember-cli-opinionated setup?';
    return this.ui.prompt(updatePrompt).then(function (response) {
      if (response.answer) {
        this.ui.writeLine('Tell us what extra features your app needs:');
        updatePrompt.message = 'Analytics?';
        return this.ui.prompt(updatePrompt).then(function (analyticResp) {
          if (analyticResp.answer) {
            packages.push('ember-e3');
          }

          updatePrompt.message = 'Mobile-Friendly?';
          return this.ui.prompt(updatePrompt).then(function (mobileResp) {
            if (mobileResp.answer) {
              packages.push('ember-gestures');
            }

            updatePrompt.message = 'Material Design?';
            return this.ui.prompt(updatePrompt).then(function (designResp) {
              if (designResp.answer) {
                packages.push('ember-paper');
              }

              return this.addOpinionatedPackagesToProject(packages);
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }
      return this.addOpinionatedPackagesToProject(packages);
    }.bind(this));
  },

  addOpinionatedPackagesToProject: function(packages) {
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
