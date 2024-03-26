import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";


Given('I am on the login page', async function () {
  await fixture.page.goto('https://the-internet.herokuapp.com/login')
})

When('I enter username {string}', async function (username: string) {
  await fixture.page.fill('#username', username)
})

When('I enter password {string}', async function (password: string) {
  await fixture.page.fill('#password', password)
})

When('I click on the login button', async function () {
  await fixture.page.click('button[type="submit"]')
})

Then('I should be greeted with {string}', async function (message: string) {
  await expect(fixture.page.locator('#flash')).toContainText(message)
})