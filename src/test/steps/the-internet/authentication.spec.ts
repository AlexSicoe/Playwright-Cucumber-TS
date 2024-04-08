import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { IFixture } from "../../../hooks/FixtureManager";
import { expect } from "@playwright/test";
import { removeFirstSlash } from "./common.spec";

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

Then('I should be greeted with the following login message: {string}', async function (message: string) {
  let fixture = this.fixture as IFixture
  await expect(fixture.page.locator('body')).toContainText(message)
})

/**
 * This function navigates to a given route with provided credentials.
 * 
 * There are several ways to handle authentication:
 * 
 * Variant 1 (used in this function): Prepend the credentials to the URL.
 * 
 * Variant 2: Set the Authorization header. This works only for Basic auth.
 * Example:
 * ```typescript
* fixture.context.setExtraHTTPHeaders({
*   Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
* })
* await fixture.page.goto(`${process.env.BASEURL}/${route}`);
* ```
* 
* Variant 3: Intercept the route and add the Authorization header. This also works only for Basic auth.
* Example:
* ```typescript
* fixture.context.route(`${process.env.BASEURL}/*`, async (route, request) => {
*   const headers = request.headers();
*   headers['Authorization'] = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
*   route.continue({ headers });
* });
* await fixture.page.goto(`${process.env.BASEURL}/${route}`);
* ```
*/
Given('I am on the {string} route with credentials {string} and {string}', async function (route: string, username: string, password: string) {
  let fixture = this.fixture as IFixture
  route = removeFirstSlash(route);

  // Variant 1: prepend credentials to the URL
  let baseUrl = new URL(process.env.BASEURL);
  await fixture.page.goto(`https://${username}:${password}@${baseUrl.host}/${route}`);
})