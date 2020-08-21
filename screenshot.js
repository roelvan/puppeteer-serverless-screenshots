const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type = 'jpeg', quality = 80) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
  );
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector('.iubenda-cs-accept-btn');
  await page.click('.iubenda-cs-accept-btn');
  const file = await page.screenshot({ type, quality });
  await browser.close();
  return file;
}

module.exports = getScreenshot;
