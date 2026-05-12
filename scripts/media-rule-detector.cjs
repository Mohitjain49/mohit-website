const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');
const postcss = require('postcss');
const scss = require('postcss-scss');
const glob = require('fast-glob');

async function getMediaStrings() {
  const files = await glob(['**/*.{vue,scss}'], { 
    ignore: ['node_modules/**', '.nuxt/**', 'dist/**', '.output/**'] 
  });
  
  const results = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const fileName = path.basename(file);
    let styleBlocks = [];

    if (file.endsWith('.vue')) {
      const { descriptor } = parse(content);
      // Ensure we only process blocks that actually have content
      styleBlocks = descriptor.styles.map(s => s.content).filter(Boolean);
    } else {
      styleBlocks = [content];
    }

    for (const styleContent of styleBlocks) {
      try {
        const root = scss.parse(styleContent);

        root.walkAtRules('media', (atRule) => {
          const params = atRule.params.toLowerCase();
          const conditions = params.split(/and|,/);

          conditions.forEach(condition => {
            let direction = '';
            if (condition.includes('max-') || condition.includes('<')) direction = '<';
            else if (condition.includes('min-') || condition.includes('>')) direction = '>';

            let dimension = '';
            if (condition.includes('width')) dimension = 'w';
            else if (condition.includes('height')) dimension = 'h';

            const match = condition.match(/\d+/);
            const value = match ? match[0] : '';

            if (direction && dimension && value) {
              // Format: direction-dimension-value_filename
              results.push(`${direction}-${dimension}-${value}_${fileName}`);
            }
          });
        });
      } catch (e) {
        console.error(`PostCSS parsing error in ${file}:`, e.message);
      }
    }
  }

  return results.sort();
}

// Executing and logging the result
getMediaStrings().then(res => {
  console.log(res);
});