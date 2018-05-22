const puppeteer = require('puppeteer');
const CRED = require('./creds');

const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

const ID = {
  login: '#email',
  pass: '#pass'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let login = async () => {
    // login
    await page.goto('https://facebook.com', {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector(ID.login);
    console.log(CRED.user);
    console.log(ID.login);
    await page.type(ID.login, CRED.user);

    await page.type(ID.pass, CRED.pass);
    await sleep(500);

    await page.click("#loginbutton")

    console.log("login done");
    await page.waitForNavigation();
  }
  await login();
  await page.screenshot({
    path: 'facebook.png'
  });
})();
