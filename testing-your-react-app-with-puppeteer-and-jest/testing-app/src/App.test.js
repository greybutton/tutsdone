// import puppeteer from "puppeteer";
const puppeteer = require('puppeteer');
const faker = require('faker')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

const user = {
  email: faker.internet.email(),
  password: 'test',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
}

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

let browser
let page
beforeAll(async () => { 
  browser = await puppeteer.launch(isDebugging()) 
  page = await browser.newPage() 
  await page.goto('http://localhost:3000/') 
  page.emulate(iPhone)
})

afterAll(() => {     
  if (isDebugging()) {         
    browser.close()     
  } 
})

describe('on page load', () => {
  test('h1 loads correctly', async() => {
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Welcome to React');
  })

  test('nav loads correctly', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false)
    const listItems = await page.$$('.nav-li')
    expect(navbar).toBe(true)
    if (listItems.length !== 3) {
      await page.screenshot({path: 'screenshot.png'})
      expect(listItems.length).toBe(3)
    } else {
      expect(listItems.length).toBe(4)
    }
  })
})

describe('login form', () => {
  test(
    'login form works correctly',
    async () => {
      const firstNameEl = await page.$('[data-testid="firstName"]');
      const lastNameEl = await page.$('[data-testid="lastName"]');
      const emailEl = await page.$('[data-testid="email"]');
      const passwordEl = await page.$('[data-testid="password"]');
      const submitEl = await page.$('[data-testid="submit"]');

      await firstNameEl.click();
      await page.type('[data-testid="firstName"]', user.firstName);

      await lastNameEl.click();
      await page.type('[data-testid="lastName"]', user.lastName);

      await emailEl.click();
      await page.type('[data-testid="email"]', user.email);

      await passwordEl.click();
      await page.type('[data-testid="password"]', user.password);

      await submitEl.click();

      await page.waitForSelector('[data-testid="success"]');
    },
    1600000
  );

  test('sets firstName cookie', async () => {
    const cookies = await page.cookies();
    const firstNameCookie = cookies.find(
      c => c.name === 'firstName' && c.value === user.firstName
    );

    expect(firstNameCookie).not.toBeUndefined();
  });
})