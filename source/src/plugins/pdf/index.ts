import * as puppeteer from 'puppeteer';

export async function create(html: string) {
    try {
        const browser = await puppeteer.launch({
            headless: "new"
        });

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        });

        const pdfBuffer = await page.pdf({
            format: 'A4'
        });

        await browser.close();

        return {
            success: true,
            content: pdfBuffer
        };
    } catch(err) {
        return {
            success: false,
            content: err
        };
    }
}