import * as fs from 'fs';

console.log('hello world');

fs.readFile('tsconfig.json', 'utf-8', (err, buf) => {
    console.log(buf);
});