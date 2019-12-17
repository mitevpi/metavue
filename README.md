# MetaVue

[![Generic badge](https://img.shields.io/badge/Docs-Web-Green.svg)](https://mitevpi.github.io/metavue/)
[![Generic badge](https://img.shields.io/badge/Docs-MD-Green.svg)](docs)

[![npm](https://img.shields.io/npm/v/metavue.svg)](https://www.npmjs.com/package/metavue)
[![npm bundle size](https://img.shields.io/bundlephobia/min/metavue.svg)](https://bundlephobia.com/result?p=@metavue)
[![npm](https://img.shields.io/npm/dw/metavue.svg)](https://www.npmjs.com/package/metavue)
[![npm2](https://img.shields.io/npm/dt/metavue.svg)](https://www.npmjs.com/package/metavue)

[![GitHub issues](https://img.shields.io/github/issues/mitevpi/metavue.svg)](https://github.com/mitevpi/metavue/issues) ![David](https://img.shields.io/david/dev/mitevpi/metavue.svg)
[![GitHub last commit](https://img.shields.io/github/last-commit/mitevpi/metavue.svg)](https://github.com/mitevpi/metavue/commits/master)


Utility for extracting metadata between of Vue.js components in
application architecture.

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
directory of the Vue application with `.json` files containing the
metadata of your Vue application, and a static site at `index.html`
which can be used to visualize the data.

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

Custom Visualization From Data (PowerBI)

<img src="assets/images/powerbi-parent-child2.png" alt="Vue.js" width="500"/>

Static Site Output (This CLI)

<img src="assets/images/static-site.png" alt="Vue.js" width="800"/>
