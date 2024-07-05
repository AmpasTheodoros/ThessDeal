"use server"

import puppeteer from 'puppeteer';
import prisma from '../prisma';

export async function scrapeProduct(url: string) {
  if (!url) return;

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract the product price, title, images, price per kilo, discount percentage, and start price per kilo
    const result = await page.evaluate(() => {
      const titleElement = document.querySelector('.item-title');
      const discountPriceElement = document.querySelector('.item-DscntPrice');
      const startingPriceElement = document.querySelector('.item-StartPrice');
      const priceElement = document.querySelector('.item-price');
      const mainImageElement = document.querySelector('.img-responsive');
      const extraImageElements = document.querySelectorAll('.extra-img');
      const pricePerKiloElement = document.querySelector('.priceKgItem');
      const discountPercentElement = document.querySelector('.item-DscntPercent');
      const startPricePerKiloElement = document.querySelector('.startPriceKgItem');

      const title = titleElement?.textContent?.trim() ?? '';

      let startingPrice = '';
      let currentPrice = '';
      let imageUrls: string[] = [];
      let pricePerKilo = '';
      let discountPercent = '';
      let startPricePerKilo = '';

      if (discountPriceElement && startingPriceElement) {
        // Product has a discount
        startingPrice = startingPriceElement.textContent?.trim() ?? '';
        currentPrice = discountPriceElement.textContent?.trim() ?? '';
        discountPercent = discountPercentElement?.textContent?.trim() ?? '';
        startPricePerKilo = startPricePerKiloElement?.textContent?.trim() ?? '';
      } else if (priceElement) {
        // Product does not have a discount
        currentPrice = priceElement.textContent?.trim() ?? '';
      }

      if (mainImageElement) {
        imageUrls.push(mainImageElement.getAttribute('src') ?? '');
      }

      extraImageElements.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
          imageUrls.push(src);
        }
      });

      if (pricePerKiloElement) {
        pricePerKilo = pricePerKiloElement.textContent?.trim() ?? '';
      }

      return { title, startingPrice, currentPrice, imageUrls, pricePerKilo, discountPercent, startPricePerKilo };
    });

    console.log("Title:", result.title);
    console.log("Old Price:", result.startingPrice);
    console.log("New Price:", result.currentPrice);
    console.log("Image URLs:", result.imageUrls);
    console.log("Price per Kilo:", result.pricePerKilo);
    console.log("Discount Percent:", result.discountPercent);
    console.log("Start Price per Kilo:", result.startPricePerKilo);

    // Save the data to Prisma database
    const product = await prisma.product.create({
      data: {
        title: result.title,
        startingPrice: result.startingPrice,
        currentPrice: result.currentPrice,
        imageUrls: result.imageUrls,
        pricePerKilo: result.pricePerKilo,
        discountPercent: result.discountPercent,
        startPricePerKilo: result.startPricePerKilo
      }
    });

    // Close Puppeteer
    await browser.close();

    return product;
  } catch (error) {
    console.log(error);
  }
}
