# IFB299 - Group 90
This repository holds everything related to the lifecycle of the
IFB299 'Community Management' project.

__Build Status__

[![Build Status](https://travis-ci.com/byronmejia/qut-ifb299.svg?token=acN8U3sQnG2yr6qQ4ozY&branch=develop)](https://travis-ci.com/byronmejia/qut-ifb299)

## Getting Started
### Preface
**Before you commit anything** ensure that you follow the following style
guides, including:
  - [Design Style Guide](https://tree.taiga.io/project/byronmejia-ifb299-community-platform/wiki/design-style-guide)
  - [Development Style Guide](https://tree.taiga.io/project/byronmejia-ifb299-community-platform/wiki/development-style-guide)
  - [Git Style Guide](https://tree.taiga.io/project/byronmejia-ifb299-community-platform/wiki/git-style-guide)

After ensuring that you are comfortable with each, you may begin work
on the project. Developers should make themselves most comfortable with
the development style guide, design with design, and both should be
comfortable with git style guide.

Issue tracking will be completed via GitHub Issue tracker. For more
information on how the project's GitHub Issue tracker works, please see
[Issue Tracker](https://tree.taiga.io/project/byronmejia-ifb299-community-platform/wiki/issue-tracking-guide).

### Setting up Node.JS
It is recommended that you use a node.js manager, for dependencies.

If you are a *nix user, use [NVM](https://github.com/creationix/nvm).

If you are a windows user, use [NVM-Windows](https://github.com/coreybutler/nvm-windows).

Then, install the project's node.js version
```sh
nvm install 6.3.1
```

And when you are working in the project directory, switch to the appropiate node version with
```sh
nvm use
```

### Development Tools
Now that your node environment is setup, it's time to start work on the project.

  1. Clone this project
  2. Install the NPM packages
  ```sh
  npm install
  ```
  3. Install KNEX globally, for databases
  ```sh
  npm install knex -g
  ```  
  4. Branch off from develop, EG:
  ```sh
  git checkout -b feature-sick-homepage develop
  ```
  5. Migrate local sqlite file to latest
  ```sh
  knex migrate:latest
  ```
  6. Seed development database with sample data
  ```sh
  knex seed:run development
  ```
  7. Start Development, and run with
  ```sh
  npm start
  ```
  8. And remember to test!
  ```sh
  npm test
  ```

### Production setup
Heroku does everything. We should be okay. I hope....
