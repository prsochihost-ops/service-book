// PDF экспорт через Playwright (Chromium headless) + типография
// Usage: node print.js [inputHtml] [outputPdf]
// Defaults: inputHtml = index.html, outputPdf = book.pdf

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const Typograf = require('typograf');

(async () => {
  const input = process.argv[2] || 'index.html';
  const output = process.argv[3] || 'book.pdf';

  // Читаем HTML файл
  const htmlPath = path.resolve(input);
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Применяем Typograf к исходному HTML
  const tp = new Typograf({ 
    locale: 'ru',
    htmlEntity: { type: 'name' },
  });

  // Применяем все правила типографии
  html = tp.execute(html);

  // Записываем обработанный HTML во временный файл и загружаем как file:// URL
  const tempPath = path.join(path.dirname(htmlPath), '__print.html');
  fs.writeFileSync(tempPath, html, 'utf8');
  const fileUrl = 'file:///' + tempPath.replace(/\\/g, '/');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Уважать print-стили
  await page.emulateMedia({ media: 'print' });

  // Загружаем файл как обычную страницу — все ресурсы (CSS, шрифты) подтянутся
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Ждём, пока Hyphenopoly загрузит словари и применит переносы
  await page.waitForFunction(() => {
    return typeof window.Hyphenopoly !== 'undefined' && 
           window.Hyphenopoly.isReady() === true;
  }, { timeout: 20000 }).catch(() => {
    console.log('⚠ Hyphenopoly timeout, continuing without wait...');
  });

  // Небольшая задержка для финализации переносов
  await page.waitForTimeout(1500);

  await page.pdf({
    path: output,
    printBackground: true,
    preferCSSPageSize: true,
    scale: 1,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  // Удаляем временный файл
  try { fs.unlinkSync(tempPath); } catch {}
  console.log(`✓ PDF saved -> ${output}`);
  console.log(`✓ Applied typography (ru locale): quotes, nbsp, dashes, etc.`);
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
