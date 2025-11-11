const assert = require('assert');
const { minifyCSS, minifyJS } = require('../lib/minify');

function testMinifyCSS() {
  const source = [
    '/* comment */',
    '.example {',
    '  background: url("https://example.com/image.png");',
    '  width: calc(100% - 2rem);',
    '}',
  ].join('\n');

  const output = minifyCSS(source);
  assert(!output.includes('comment'), 'CSS comments should be removed');
  assert(output.includes('https://example.com/image.png'), 'URLs must stay intact');
  assert(output.includes('calc(100% - 2rem)'), 'calc expressions should remain readable');
}

function testMinifyJS() {
  const regexLine = String.raw`const regex = /https:\/\/\//g;`;
  const source = [
    '// comment',
    'const url = "https://example.com";',
    regexLine,
    'const template = `width: ${"calc(100% - 1rem)"}`;',
    "const str = 'http://example.com';",
  ].join('\n');

  const output = minifyJS(source);
  assert(!output.includes('comment'), 'JS comments should be removed');
  assert(output.includes('https://example.com'), 'URLs should be preserved');
  const regexSnippet = String.raw`/https:\/\/\//g`;
  assert(output.includes(regexSnippet), 'Regex literals must survive');
  assert(output.includes('`width: ${'), 'Template literals should remain');
}

function run() {
  testMinifyCSS();
  testMinifyJS();
  console.log('Minifier tests passed');
}

run();
