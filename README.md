# Node Harvester

Harvest API client for Node.js 4.x built with Typescript

## Install

```bash
$ npm install --save node-harvester
```

## Usage

Via Node.js require:

```javascript
var Harvest = require('node-harvester').Harvest,
    harvest = new Harvest(harvestOptions);
```

Via ES6 import:

```javascript
import Harvest from 'node-harvester';
var harvest = new Harvest(harvestOptions);
```

## Development

Collaboration to this project can be done by following these steps:

 - requirements
 - coding
 - testing

### Requirements

Make sure to have installed the following tools:

 - Typescript (tsc)
 - Typescript Definition (tsd)
 - Typescript linter (tslint)
 - Mocha (mocha)

```bash
$ sudo npm install -g typescript tsd tslint mocha
```

### Coding

Start coding with Typescript but remember to use the linter.

### Testing

Launch test as follows:

```bash
$ npm test
```

## License

MIT