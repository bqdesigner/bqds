import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

// Tokens defined in a semantic.* file (role tokens that map to primitives).
const isSemantic = (token) => token.filePath.includes('semantic');

const cssConfig = (source, destination, selector, filter) => ({
  source,
  log: { verbosity: 'silent' },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'bq',
      buildPath: 'dist/',
      files: [
        {
          destination,
          format: 'css/variables',
          filter,
          options: { selector, outputReferences: true },
        },
      ],
    },
  },
});

async function run() {
  // Light: primitives + semantic(light) under :root
  await new StyleDictionary(
    cssConfig(['src/primitive.json', 'src/semantic.light.json'], 'light.css', ':root'),
  ).buildAllPlatforms();

  // Dark: only the semantic role tokens, remapped, under [data-theme="dark"]
  await new StyleDictionary(
    cssConfig(
      ['src/primitive.json', 'src/semantic.dark.json'],
      'dark.css',
      '[data-theme="dark"]',
      isSemantic,
    ),
  ).buildAllPlatforms();

  // JS export (resolved values) for non-CSS consumers / future app
  await new StyleDictionary({
    source: ['src/primitive.json', 'src/semantic.light.json'],
    log: { verbosity: 'silent' },
    platforms: {
      js: {
        transformGroup: 'js',
        prefix: 'bq',
        buildPath: 'dist/',
        files: [{ destination: 'tokens.js', format: 'javascript/es6' }],
      },
    },
  }).buildAllPlatforms();

  // Merge the two CSS blocks into a single tokens.css
  const css =
    readFileSync('dist/light.css', 'utf8') + '\n' + readFileSync('dist/dark.css', 'utf8');
  writeFileSync('dist/tokens.css', css);
  rmSync('dist/light.css');
  rmSync('dist/dark.css');

  console.log('✓ built dist/tokens.css + dist/tokens.js');
}

run();
