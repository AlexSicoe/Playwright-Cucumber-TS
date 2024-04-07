import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { IFixture } from "../../hooks/FixtureManager";
import { expect } from "@playwright/test";
import * as ms from 'ms';
setDefaultTimeout(ms('2 minutes'))

Given('I am on the login page', async function () {
  let fixture = this.fixture as IFixture
  await fixture.page.goto('https://the-internet.herokuapp.com/login')
})

When('I enter username {string}', async function (username: string) {
  let fixture = this.fixture as IFixture
  await fixture.page.fill('#username', username)
})

When('I enter password {string}', async function (password: string) {
  let fixture = this.fixture as IFixture
  await fixture.page.fill('#password', password)
})

When('I click on the login button', async function () {
  let fixture = this.fixture as IFixture
  await fixture.page.click('button[type="submit"]')
})

Then('I should be greeted with {string}', async function (message: string) {
  let fixture = this.fixture as IFixture
  await expect(fixture.page.locator('#flash')).toContainText(message)
})