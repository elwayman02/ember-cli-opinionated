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
      'ember-cli-sass',
      'ember-cpm',
      'ember-feature-flags',
      'ember-metrics',
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
      extend({ message: 'Organizing Your App Into Pods', packages: ['ember-cli-sass-pods'] }, updatePrompt),
      extend({ message: 'Analytics/Reports', packages: ['ember-e3'] }, updatePrompt),
      extend({ message: 'Testing', packages: ['ember-cli-mirage', 'ember-sinon-qunit', 'ember-try'] }, updatePrompt),
      extend({ message: 'Mobile Touch', packages: ['ember-gestures'] }, updatePrompt),
      extend({ message: 'Material Design', packages: ['ember-paper'] }, updatePrompt),
      extend({ message: 'Animations', packages: ['liquid-fire'] }, updatePrompt)
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
          } else {
            this.ui.writeLine('Tell us what extra features your app needs:');
          }
          if (index < prompts.length - 1) { // Keep giving prompts until the last iteration
            var nextPrompt = prompts[index + 1];
            nextPrompt.message += ' (' + nextPrompt.packages.join(', ') + ')?';
            return this.ui.prompt(nextPrompt);
          }
          return this.addOpinionatedPackagesToProject(packages);
        }
        return prev;
      }.bind(this));
    }.bind(this), this.ui.prompt(prompts[0])).then(function () {
      this.ui.writeLine("Congratulations! You've enhanced your Ember application. Find out more at http://jhawk.co/ember-cli-opinionated");
    }.bind(this));
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
