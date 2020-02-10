const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
const files = [
'./dist/infosComponent/runtime-es2015.js',
'./dist/infosComponent/polyfills-es2015.js',
'./dist/infosComponent/scripts.js',
'./dist/infosComponent/main-es2015.js'
];
await fs.ensureDir('elements');
await concat(files, 'elements/infos-elements.js');
console.log('Process finished')
})();