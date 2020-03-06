import * as puppeteer from 'puppeteer';
import { getBrowser } from '../utils';

const { port } = require('../../../config/local.json');

jest.setTimeout(100000);

describe('App', () => {
  it(`Should be runned on port ${port}`, async done => {
    console.log(global);
    const browser = getBrowser();
    const page = await browser.newPage();

    await page.goto(`http://localhost:${port}/auth`);
    await page.screenshot({ path: 'test-screen.png' });

    await new Promise(resolve => setTimeout(resolve, 10000));
    expect(page.select('#test')).toHaveLength(1);

    browser.close();

    done();
  });
});
