import { Given, When, Then } from "@cucumber/cucumber";
import { IFixture } from "../../../hooks/FixtureManager";
import { expect } from "@playwright/test";

Given('I am on the {string} page', async function (path) {
  let fixture = this.fixture as IFixture
  await fixture.page.goto(`${process.env.BASEURL}${path}`);
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