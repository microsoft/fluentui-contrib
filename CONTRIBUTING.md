# Contributing

Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Getting started

### Prerequisites

Make sure you have at least Node.js v18:

```sh
node -v

v18.0.0
```

This repo runs with Yarn v1, please install make sure to install it, since all other steps will assume
that you have this dependency installed.

```sh
npm install -g yarn@1
```

### Setup the repo

Start by [forking the repo](https://github.com/microsoft/fluentui-contrib). Then clone your fork and
install dependencies.

```sh
git clone git@github.com:<your-user>/fluentui-contrib.git
cd fluentui-contrib
yarn
```

Add the main repo as a git remote so you can pull/rebase your fork with our latest updates:

```sh
git remote add upstream git@github.com:microsoft/fluentui-contrib.git
```

## Creating a new package

> [!IMPORTANT]
> Every new package needs to go through 2 step PR process
>
> - 1st PR bootstraps package via generator
> - 2nd PR adds implementation logic

> [!IMPORTANT]
> Every package needs to have owner assigned within [CODEOWNERS](./.github/CODEOWNERS) file. It's highly recommended to use Github Team as owner instead individual to mitigate unmaintained code risks.

You can create a new package by running the following commands.

> `<project-name>` refers to the name of your project specified within `project.json#name`.
> The final published package will include npmScope -> `@fluentui-contrib/<project-name>`
> For example for `react-chat` 👇👇
>
> packages/react-chat
> @fluentui-contrib/react-chat
> yarn nx react-chat:build

> [!NOTE]
>
> - To run tasks(targets) we use `nx run` command. Learn more https://nx.dev/nx-api/nx/documents/run
> - To run generators we use `nx generate` command. Learn more https://nx.dev/nx-api/nx/documents/generate#generate

```sh
# Scaffolds a new folder in the packages/ directory with autogenerated package files
yarn nx generate @fluentui-contrib/nx-plugin:library <project-name>

# Configures storybook for the package
yarn nx generate @fluentui-contrib/nx-plugin:configure-storybook <project-name>

# Configures playwright browser testing for the package
yarn nx generate @fluentui-contrib/nx-plugin:playwright-component-configuration <project-name>

# Scaffolds a new component with sample implementation and example documentation
yarn nx generate @fluentui-contrib/nx-plugin:component <project-name> <componentName>

# Run any project task(target)
yarn nx run <project-name>:<target>

# Starts the storybook for you project
yarn nx run <project-name>:storybook
```

### Contract

Contribution packages enable Fluent UI contributors and other Microsoft partners
use Fluent UI to create rich experiences that build on the design system, without
the requirements of the design system getting in the way. We give the initiative
to contributors to ship their packages with an API and support structure that makes
sense to them.

There are however a few housekeeping requirements that we impose on contribution packages:

- README authoring - please author the README.md file for your package to be helpful to users
- Documentation - each package should have documentation examples powered by Storybook
- Issues - be a responsible maintainer and address user issues for your package

Other than the basic housekeeping requirements, the contribution package sandbox for developers
to build on. The Fluent UI team is happy to work with contributors if they need help and
guidance.

## Common commands

> `<name>` refers to the name of a folder within the `packages/` folders. The
> final published package will have the form of `@fluentui-contrib/<name>`
> For example for `react-chat` 👇👇
>
> packages/react-chat
> @fluentui-contrib/react-chat
> yarn nx build react-chat

This repository uses as [Nx](https://nx.dev/). We have configured common commands
across all packages that is the baseline to be able to:

- develop
- test
- document
- build
- publish

All commands are run from the root of the monorepo for any package. There should be no need to move
around package folders to run commands.

### storybook

Starts storybook for a package

```sh
yarn nx run <name>:storybook
```

### test

Runs unit tests using [jest](https://jestjs.io/)

```sh
yarn nx run <name>:test
```

### build

Builds source code with es6 and common-js formats in the `dist/` folder in the monorepo root.

```sh
yarn nx run <name>:build
```

### type-check

Checks typescript usage and generates type files in the `dist/` folder in the monorepo root.

```sh
yarn nx run <name>:type-check
```

### format

Formats the code with prettier

```sh
yarn nx format
```
