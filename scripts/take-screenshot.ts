import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1024, height: 900 }
  });
  
  await page.goto('http://localhost:4173/#/demo');
  await page.waitForTimeout(30000);
  
  const element = await page.locator('#server-card-content');
  await element.screenshot({ path: 'screenshot.png' });
  
  await browser.close();
})();
