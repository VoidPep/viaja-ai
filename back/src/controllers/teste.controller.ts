import { Controller, Get } from "@nestjs/common";
import puppeteer from "puppeteer";

@Controller("testes")
export class TesteController {
    @Get()
    async get() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36');

        await page.goto('https://www.google.com/travel/explore?hl=pt-BR&gl=BR&curr=BRL', { waitUntil: 'networkidle2' });

        try {
            await page.waitForSelector('input.II2One.j0Ppje.zmMKJ.LbIaRd');

            const teste = await page.$$("input.II2One.j0Ppje.zmMKJ.LbIaRd")
            await teste[1].type('Qualquer');

            // await page.keyboard.press('Enter');

            // await browser.close();
        } catch (error) {
            await browser.close();
            throw new Error(error);
        }
    }
}