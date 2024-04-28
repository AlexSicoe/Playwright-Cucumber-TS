import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { IFixture } from "../../../hooks/FixtureManager";
import { expect } from "@playwright/test";

export const removeFirstSlash = (route: string): string => route.startsWith('/') ? route.substring(1) : route;

Given('I am on the {string} route', async function (route: string) {
  let fixture = this.fixture as IFixture
  route = removeFirstSlash(route);
  await fixture.page.goto(`${process.env.BASEURL}/${route}`);
})

When('I click on the {string} link', async function (linkText: string) {
  const { page } = this.fixture as IFixture;
  await page.click(`a:has-text("${linkText}")`);
  // await page.getByRole('link', { name: linkText }).click()
});

Given('I am on the homepage', async function () {
  const { page } = this.fixture as IFixture;
  await page.goto(process.env.BASEURL);
});
