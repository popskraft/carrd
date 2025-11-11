const removeCssComments = css => css.replace(/\/\*[\s\S]*?\*\//g, '');

function minifyCSS(css) {
  const withoutComments = removeCssComments(css);
  return withoutComments
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJS(js) {
  let result = '';
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inRegex = false;
  let inRegexClass = false;
  let escaping = false;

  const shouldStartRegex = () => {
    let i = result.length - 2; // ignore current '/'
    while (i >= 0) {
      const char = result[i];
      if (/\s/.test(char)) {
        i--;
        continue;
      }
      return /[({[=!:;,?&|+\-*%^<>]/.test(char) || char === undefined;
    }
    return true;
  };

  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const nextChar = js[i + 1];

    if (!inSingle && !inDouble && !inTemplate && !inRegex) {
      if (char === '/' && nextChar === '/') {
        i += 2;
        while (i < js.length && js[i] !== '\n') i++;
        continue;
      }
      if (char === '/' && nextChar === '*') {
        i += 2;
        while (i < js.length && !(js[i] === '*' && js[i + 1] === '/')) i++;
        i++;
        continue;
      }
    }

    result += char;

    if (escaping) {
      escaping = false;
      continue;
    }

    if (char === '\\') {
      escaping = true;
      continue;
    }

    if (inRegex) {
      if (char === '[') {
        inRegexClass = true;
      } else if (char === ']' && inRegexClass) {
        inRegexClass = false;
      } else if (char === '/' && !inRegexClass) {
        inRegex = false;
      }
      continue;
    }

    if (inSingle) {
      if (char === '\'') inSingle = false;
      continue;
    }

    if (inDouble) {
      if (char === '"') inDouble = false;
      continue;
    }

    if (inTemplate) {
      if (char === '`') inTemplate = false;
      continue;
    }

    if (char === '\'') {
      inSingle = true;
    } else if (char === '"') {
      inDouble = true;
    } else if (char === '`') {
      inTemplate = true;
    } else if (char === '/' && shouldStartRegex()) {
      inRegex = true;
    }
  }

  return result.trim();
}

module.exports = {
  minifyCSS,
  minifyJS,
};
