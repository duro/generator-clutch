# Clutch Framework Generators

This Yeoman generator pack has a number of built in generators for workign inside the Clutch Framework.

## Install

Since this module is not in the NPM registry yet, please follow the following steps to get installed:

1. Clone down the repo

    `$ git clone git@github.com:duro/generator-clutch.git`

2. Use NPM link to link it to your global NPM library

    ```
    $ cd generator-clutch
    $ npm link
    ```

You should now be able to use all the commands below:

## Generators

### `yo clutch`

This will build a full-stack Clutch app that consists of a node.js backend (powered by Express and Locomotive), and will provide the framework for building client side apps right along side this back-end server

### `yo clutch:ng`

This will build an angular app skeleton using the [clutch-angular-seed](https://github.com/duro/clutch-angular-seed).

This generator can be used without needing to be a part of an overall Clutch full-stack project. It can be used on it's own to build a feature rich base Angular app.

Please read the clutch-angular-seed README that will detail some additional details of how to work inside the skeleton

### `yo clutch:ng-module`

This should be run from the root of a clutch-angular-seed project folder. It will create a named module in the style encouraged by Clutch Angular Seed.
