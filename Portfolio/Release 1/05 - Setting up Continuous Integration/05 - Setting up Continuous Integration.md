# 05 - Setting Up Continuous Integration
Continuous Integration (or CI for short), allows us as the
developer team to check on how the build is going, whether it will pass,
and automatically deploy GOOD apps straight to heroku.

This was completed by linking the app in Travis-CI within the Travis-CI 
page, and then adding a `.travis.yml` file to tell the container how
to build the application. 

For this first release, it would only check of the source was buildable, 
then push all build artifacts to heroku upon success. CI would make
more sense if there was tests written, to ensure all tests pass before pushing
to production. One interesting part was, the CI runner was set to also run 
a 'linter' suite, to ensure the code quality was up to scratch. 

For this, I implemented `eslint` with `airbnb-plugin`. That means, 
the code must pass the AirBNB set JS quality level. That can range from
tasks including "Don't use ternary operators" to "using 2 spaces instead of 4".

To see an artifact on setting up continuous integration please see:
  - https://github.com/byronmejia/qut-ifb299/commit/c76e24b6dda6e111e2c4d81ed4942d6d26b950bf
