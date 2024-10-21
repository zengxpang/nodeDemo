const yaml = require('js-yaml')
const fs = require('fs');

try {
    const doc = yaml.load(fs.readFileSync('./hello.yaml', 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}