import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    page.on('console', (msg) => {
      console.log('PAGE_CONSOLE', msg.type(), msg.text());
    });

    page.on('pageerror', (err) => {
      console.log('PAGE_ERROR', err.toString());
      if (err.stack) console.log('PAGE_ERROR_STACK', err.stack);
    });

    page.on('requestfailed', (req) => {
      console.log('REQUEST_FAILED', req.url(), req.failure() && req.failure().errorText);
    });

    const url = process.argv[2] || 'http://localhost:3000';
    console.log('Visiting', url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const html = await page.content();
    console.log('PAGE_HTML_LENGTH', html.length);

    await page.screenshot({ path: 'collect-screenshot.png', fullPage: true });
    console.log('Wrote screenshot collect-screenshot.png');

    await browser.close();
  } catch (err) {
    console.error('SCRIPT_ERROR', err);
    process.exit(1);
  }
})();
