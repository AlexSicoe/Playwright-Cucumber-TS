import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { IFixture } from '../../../hooks/FixtureManager';

Then('the {string} menu item should be disabled', async function (menuItem: string) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator(`#menu > li:has-text("${menuItem}")`)).toHaveAttribute('class', /\bui-state-disabled\b/);
});

When('I hover over the {string} menu item', async function (menuItem: string) {
  const { page } = this.fixture as IFixture;
  await page.hover(`#menu > li:has-text("${menuItem}")`);
});

Then('I should see the submenu items {string} and {string}', async function (submenuItem1: string, submenuItem2: string) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator(`#menu > li > ul > li:has-text("${submenuItem1}")`)).toBeVisible();
  await expect(page.locator(`#menu > li > ul > li:has-text("${submenuItem2}")`)).toBeVisible();
});

When('I hover over the {string} submenu item', async function (submenuItem: string) {
  const { page } = this.fixture as IFixture;
  await page.hover(`#menu > li > ul > li:has-text("${submenuItem}")`);

  // no need
  // await page.waitForSelector(`#menu > li > ul > li:has-text("${submenuItem}") > ul > li`);
});

Then('I should see the submenu items {string}, {string}, and {string}', async function (submenuItem1: string, submenuItem2: string, submenuItem3: string) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator(`#menu > li > ul > li > ul > li:has-text("${submenuItem1}")`)).toBeVisible();
  await expect(page.locator(`#menu > li > ul > li > ul > li:has-text("${submenuItem2}")`)).toBeVisible();
  await expect(page.locator(`#menu > li > ul > li > ul > li:has-text("${submenuItem3}")`)).toBeVisible();
});

When('I click on the {string} submenu item', async function (submenuItem: string) {
  const { page } = this.fixture as IFixture;
  // await page.click(`#menu > li > ul > li:has-text("${submenuItem}")`);
  await page.getByRole('link', { name: submenuItem }).click()
});

When('I click on the {string} subsubmenu item', async function (submenuItem: string) {
  const { page } = this.fixture as IFixture;
  await page.click(`#menu > li > ul > li > ul > li:has-text("${submenuItem}")`);
  // await page.getByRole('link', { name: submenuItem }).click()
});

Then('the {string} file should be downloaded', async function (filename: string) {
  const { page } = this.fixture as IFixture;
  const download = await page.waitForEvent('download');
  expect(download.suggestedFilename()).toBe(filename);
});

Then('I should be redirected to the {string} route', async function (route: string) {
  const { page } = this.fixture as IFixture;
  await expect(page).toHaveURL(`${process.env.BASEURL}${route}`);
});
