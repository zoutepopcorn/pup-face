const puppeteer = require('puppeteer');
const CRED = require('./creds');

const ID = {
  login: '#email',
  pass: '#pass'
};

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  let login = async () => {
    // login
      await page.goto('https://facebook.com', {waitUntil: 'networkidle'});
      await page.waitForSelector(ID.login);
      await page.type(CRED.user);
      await page.type('\t');
      await page.type(CRED.pass);
      await page.type('\r\n');
      console.log("login done");
      await page.waitForNavigation();
  }
  await login();
  await page.screenshot({path: 'facebook.png'});
})();
