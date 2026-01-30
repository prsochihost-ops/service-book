// Применить типографию к HTML файлу и сохранить результат
// Usage: node apply-typograf.js [inputHtml] [outputHtml]
// Defaults: inputHtml = index.html, outputHtml = index_typo.html

const path = require('path');
const fs = require('fs');
const Typograf = require('typograf');

(async () => {
  const input = process.argv[2] || 'index.html';
  const output = process.argv[3] || 'index_typo.html';

  const inputPath = path.resolve(input);
  const outputPath = path.resolve(output);

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    process.exit(1);
  }

  // Читаем исходный HTML
  let html = fs.readFileSync(inputPath, 'utf8');

  // Применяем Typograf с расширенными опциями
  const tp = new Typograf({ 
    locale: 'ru',
    htmlEntity: { type: 'name' },
    rules: [
      '+ru/punctuation/exclamation',
      '+ru/punctuation/hellip',
      '+ru/punctuation/number',
      '+ru/punctuation/quote',
      '+ru/symbols/letter/ee-to-yo',
      '+ru/nbsp/afterNumberSign',
      '+ru/nbsp/afterPlusMinusLeadingSymbol',
      '+ru/nbsp/afterShortWordsAndParticles',
      '+ru/nbsp/beforeParticleO',
      '+ru/nbsp/dashes',
      '+ru/nbsp/ps',
      '+ru/other/accent',
      '+ru/other/salyVkusno',
    ],
  });

  let typedHtml = tp.execute(html);

  // Сохраняем результат
  fs.writeFileSync(outputPath, typedHtml, 'utf8');

  console.log(`✓ Typography applied with hyphenation rules`);
  console.log(`✓ Saved to: ${output}`);
  console.log(`\nOpen in browser: file:///${outputPath.replace(/\\/g, '/')}`);
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
