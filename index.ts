import * as fs from 'fs';

console.log('hello world');

fs.readFile('tsconfig.json', 'utf-8', (err: any, buf: Buffer) => {
    console.log(buf);
});

var Harvest = require('node-harvester'),
    harvest = new Harvest(cfg);

