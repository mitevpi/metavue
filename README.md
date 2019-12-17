# MetaVue

[![Generic badge](https://img.shields.io/badge/Docs-Web-Green.svg)](https://mitevpi.github.io/metavue/) [![Generic badge](https://img.shields.io/badge/Docs-MD-Green.svg)](docs/README.md) [![Generic badge](https://img.shields.io/badge/Samples-JS-Green.svg)](samples)

[![GitHub issues](https://img.shields.io/github/issues/mitevpi/metavue.svg)](https://github.com/mitevpi/metavue/issues) [![GitHub last commit](https://img.shields.io/github/last-commit/mitevpi/metavue.svg)](https://github.com/mitevpi/metavue/commits/master)

Utility for extracting metadata between of Vue.js components in application architecture.

## Usage

### Install

Install globally by running the command below on a cmd/terminal:

```cmd
npm i -g metavue
```

### Use

Once installed, the CLI utility can be used from any cmd/terminal instance
using the following command:

```cmd
metavue -d PATH_TO_YOUR_VUE_APP
```

### Output

The CLI utility will generate a folder called `.metavue` in the root
directory of the Vue application with `.json` files containing
the metadata of your Vue application.

#### Sample

```json
// ComponentArchitecture.json
 {
    "path": "/Users/mitevpi/Documents/GitHub/stroll-app/src/App.vue",
    "name": "App",
    "imports": null,
    "data": [
        "selectMobile",
        "isMobile",
        "roundAmount",
        "currentPage"
    ],
    "components": [
        "Footer",
        "Header",
        "LogIn",
        "UserInterface",
        "Splash"
    ]
},
```

```json
// ParentChildData.json
{
    "parent": "App",
    "child": "Footer"
},
{
    "parent": "App",
    "child": "Header"
},
{
    "parent": "App",
    "child": "LogIn"
},
```
