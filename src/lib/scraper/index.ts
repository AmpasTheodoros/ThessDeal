"use server"

import puppeteer from 'puppeteer';

export async function scrapeProduct(url: string) {
  if (!url) return;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the element to load
    await page.waitForSelector('.item-DscntPrice');

    // Extract the product price and title
    const result = await page.evaluate(() => {
      const titleElement = document.querySelector('.item-title');
      const startingPriceElement = document.querySelector('.item-StartPrice');
      const currentPriceElement = document.querySelector('.item-DscntPrice');
      const title = titleElement ? titleElement.textContent.trim() : '';
      const startingPrice = startingPriceElement ? startingPriceElement.textContent.trim() : '';
      const currentPrice = currentPriceElement ? currentPriceElement.textContent.trim() : '';
      return { title, startingPrice, currentPrice};
    });

    console.log("the title is: " + result.title + " the old price was: " + result.startingPrice + " the news price is: " + result.currentPrice);  // Should log the title and "13.27€"

    // Close Puppeteer
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}
