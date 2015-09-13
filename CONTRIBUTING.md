# Questions

This is the repository for Ember-CLI-Opinionated. We use this site
to collect and track bugs and discussions of new features. If you are having
difficulties using this addon or have a question about usage please 
[create an issue](https://github.com/elwayman02/ember-cli-opinionated/issues/) 
or ask a question on 
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=Ember+Ember-CLI)

# Issues

Think you've found a bug or have a new feature to suggest? Let us know!

## Reporting a Bug

1. Update to the most recent master release if possible. We may have already
fixed your bug.

2. Search for similar issues. It's possible somebody has encountered
this bug already.

3. Provide Ember-Twiddle or JSBin demo that specifically shows the problem. This
demo should be fully operational with the exception of the bug you want to
demonstrate. The more pared down, the better.
If it is not possible to produce a fiddle, please make sure you provide very
specific steps to reproduce the error. If we cannot reproduce it, we will
close the ticket.

4. Your issue will be verified. The provided example will be tested for
correctness. The Ember-CLI-Opinionated team will work with you until your issue can
be verified.

5. Keep up to date with feedback from the team on your ticket. Your
ticket may be closed if it becomes stale.

6. If possible, submit a Pull Request with a failing test. Better yet, take
a stab at fixing the bug yourself if you can!

The more information you provide, the easier it is for us to validate that
there is a bug and the faster we'll be able to take action.

## Requesting a Feature

1. Search Issues for similar feature requests. It's possible somebody has
already asked for this feature or provided a pull request that we're still
discussing.

2. Provide a clear and detailed explanation of the feature you want and why
it's important to add. Keep in mind that we want features that will be useful
to the majority of our users and not just a small subset.

3. If the feature is complex, consider writing some initial documentation for
it. If we do end up accepting the feature it will need to be documented and
this will also help us to understand it better ourselves.

4. Attempt a Pull Request. If you're at all able, start writing some code. We
always have more work to do than time to do it. If you can write some code
then that will speed the process along.

# Pull Requests

We love pull requests. Here's a quick guide:

1. Fork the repo.

2. Run the tests. We only take pull requests with passing tests.

3. Add a test for your change. Only refactoring and documentation changes
require no new tests. If you are adding functionality or fixing a bug, we need
a test (preferably several)!

4. Make the test(s) pass.

5. Commit your changes. Please use an appropriate commit prefix.
If your pull request fixes an issue specify it in the commit message. Some examples:

  ```
  [DOC] Update CONTRIBUTING.md for commit prefixes
  [FEATURE] Message
  [BUG] Message Fixes #123
  ```

6. Push to your fork and submit a pull request. Please provide us with some
explanation of why you made the changes you made. For new features make sure to
explain a standard use case to us.

We try to be quick about responding to tickets but sometimes we get a bit
backlogged. If the response is slow, try contacting [Jordan Hawker](mailto:hawker.jordan@gmail.com) directly.

Some things that will increase the chance that your pull request is accepted:

* Include tests that fail without your code, and pass with it
* Update the documentation, the surrounding ones, examples elsewhere, guides,
  whatever is affected by your contribution

Syntax:

* Tabs, not spaces.  We understand that many people prefer spaces (as do we), but by enforcing tabs 
  we allow everyone to configure their editors to display however many "spaces" works best for them
* No trailing whitespace. Blank lines should not have any space.
* a = b and not a=b.
* Follow the conventions you see used in the source already.

Inline Documentation Guidelines:

All inline documentation is written using JSDoc.

And in case we didn't emphasize it enough: we love tests!

NOTE: Partially copied & altered from https://raw.githubusercontent.com/emberjs/ember.js/master/CONTRIBUTING.md
