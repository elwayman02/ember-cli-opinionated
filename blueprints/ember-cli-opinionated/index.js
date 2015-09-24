function extend(obj, src) {
  Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
  return obj;
}

module.exports = {
  description: 'Set up additional packages for Ember apps',
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function () {
    var packages = [
      'ember-cli-autoprefixer',
      'ember-cli-blanket',
      'ember-cli-sass-pods',
      'ember-cpm',
      'ember-feature-flags',
      { name: 'ember-metrics', target: '0.1.5' },
      'ember-moment',
      'ember-responsive',
      'ember-suave',
      'ember-truth-helpers'
    ];

    var updatePrompt = {
      type: 'confirm',
      name: 'answer',
      choices: [
        { key: 'y', name: 'Yes', value: 'yes' },
        { key: 'n', name: 'No', value: 'no' }
      ]
    };

    var prompts = [
      extend({ message: 'Would you like to enhance your ember-cli-opinionated setup?', packages: packages }, updatePrompt),
      extend({ message: 'Analytics?', packages: ['ember-e3'] }, updatePrompt),
      extend({ message: 'Mobile-Friendly?', packages: ['ember-gestures'] }, updatePrompt),
      extend({ message: 'Material Design?', packages: ['ember-paper'] }, updatePrompt)
    ];

    return this.promptUserForOpinions(packages, prompts);
  },

  promptUserForOpinions: function (packages, prompts) {

    var done = false;

    return prompts.reduce(function (prev, prompt, index) {
      return prev.then(function (response) {
        if (!done) {
          if (index) { // True if user is not on the first question
            if (response.answer) { // User answered yes to the question
              packages = packages.concat(prompt.packages);
            }
          } else if (!response.answer) {
            done = true;
            return this.addOpinionatedPackagesToProject(packages);
          }
          if (index < prompts.length - 1) { // Keep giving prompts until the last iteration
            return this.ui.prompt(prompts[index + 1]);
          }
          return this.addOpinionatedPackagesToProject(packages);
        }
        return prev;
      }.bind(this));
    }.bind(this), this.ui.prompt(prompts[0]));
  },

  addOpinionatedPackagesToProject: function (packages) {
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
