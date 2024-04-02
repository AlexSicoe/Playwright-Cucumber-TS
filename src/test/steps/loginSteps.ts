import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IFixture } from "../../hooks/FixtureManager";
import * as ms from 'ms';
setDefaultTimeout(ms('2 minutes'))

Given('User navigates to the application', async function () {
    let fixture = this.fixture as IFixture
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
})

Given('User click on the login link', async function () {
    let fixture = this.fixture as IFixture
    await fixture.page.locator("//span[text()='Login']").click();
});

Given('User enter the username as {string}', async function (username) {
    let fixture = this.fixture as IFixture
    await fixture.page.locator("input[formcontrolname='username']").type(username);
});

Given('User enter the password as {string}', async function (password) {
    let fixture = this.fixture as IFixture
    await fixture.page.locator("input[formcontrolname='password']").type(password);
})

When('User click on the login button', async function () {
    let fixture = this.fixture as IFixture
    await fixture.page.locator("button[color='primary']").click();
    await fixture.page.waitForLoadState();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
    let fixture = this.fixture as IFixture
    const user = fixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]");
    await expect(user).toBeVisible();
    const userName = await user.textContent();
    console.log("Username: " + userName);
    fixture.logger.info("Username: " + userName);
})

When('Login should fail', async function () {
    let fixture = this.fixture as IFixture
    const failureMesssage = fixture.page.locator("mat-error[role='alert']");
    await expect(failureMesssage).toBeVisible();
});
