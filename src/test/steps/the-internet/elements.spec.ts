import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { IFixture } from '../../../hooks/FixtureManager';

When('I click on the {string} button', async function (buttonText: string) {
  const { page } = this.fixture as IFixture;
  // await page.click(`button:has-text("${buttonText}")`);
  await page.getByRole('button', { name: buttonText }).click();
});

Then('I should see a new {string} button appear', async function (buttonText: string) {
  const { page } = this.fixture as IFixture;
  // await expect(page.locator(`button:has-text("${buttonText}")`)).toBeVisible();
  await expect(page.getByRole('button', { name: buttonText })).toBeVisible();
});

Then('the {string} button should disappear', async function (buttonText: string) {
  const { page } = this.fixture as IFixture;
  // await expect(page.locator(`button:has-text("${buttonText}")`)).toBeHidden();
  await expect(page.getByRole('button', { name: buttonText })).toBeHidden()
});

When('I check checkbox {int}', async function (checkboxIndex: number) {
  const { page } = this.fixture as IFixture;
  await page.check(`form#checkboxes input[type="checkbox"]:nth-of-type(${checkboxIndex})`);
  // from codegen
  // await page.getByRole('checkbox').first().check();
  // await page.getByRole('checkbox').nth(1).uncheck();
});

Then('checkbox {int} should be checked', async function (checkboxIndex: number) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator(`form#checkboxes input[type="checkbox"]:nth-of-type(${checkboxIndex})`)).toBeChecked();
});

When('I uncheck checkbox {int}', async function (checkboxIndex: number) {
  const { page } = this.fixture as IFixture;
  await page.uncheck(`form#checkboxes input[type="checkbox"]:nth-of-type(${checkboxIndex})`);
});

Then('checkbox {int} should be unchecked', async function (checkboxIndex: number) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator(`form#checkboxes input[type="checkbox"]:nth-of-type(${checkboxIndex})`)).not.toBeChecked();
});

When('I enter the value {string} into the input field', async function (value: string) {
  const { page } = this.fixture as IFixture;
  await page.fill('input[type="number"]', value);
});

Then('the input field should display {string}', async function (value: string) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator('input[type="number"]')).toHaveValue(value);
});

When('I clear the input field', async function () {
  const { page } = this.fixture as IFixture;
  await page.fill('input[type="number"]', '');
});

Then('the input field should be empty', async function () {
  const { page } = this.fixture as IFixture;
  await expect(page.locator('input[type="number"]')).toHaveValue('');
});

Then('the page should contain {int} rows in the table', async function (rowCount: number) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator('#large-table tbody tr')).toHaveCount(rowCount);
});

Then('I should see the text {string} in the shadow DOM', async function (text: string) {
  const { page } = this.fixture as IFixture;
  await expect(page.locator('#content >>> slot')).toContainText(text);
});