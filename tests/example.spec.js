// @ts-check
const { test, expect } = require('@playwright/test');
//const { title } = require('process');
/*
test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

test.describe('Позитивные сценарии', () => {
  test('Успешный редирект на страницу Products, Login', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.getByText('Products')).toBeVisible();
  })
  test('Успешный редирект на страницу авторизации, по кнопке Logout', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('button', { name: /Open Menu/ }).click()
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('https://www.saucedemo.com')
  })
  test('Сокрытие уведомления об ошибке, по кнопке Х', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('странный пароль')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByText('Epic sadface: Username and password do not match any user in this service').waitFor({ state: 'visible' })
    await page.locator('[class="error-button"]').waitFor({ state: 'visible' })
    await page.locator('[class="error-button"]').click()
    await expect(page.locator('[class="error-message-container error"]')).toBeHidden()
  })
  test('Успешное добавления фонарика в корзину', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[class="shopping_cart_badge"]')).toBeVisible();
    await expect(page.locator('[class="shopping_cart_badge"]')).toHaveText('1')
  })
})

test.describe('Негативный сценарий', () => {
  test('Получение уведомления об ошибке, если пароль не корректен', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('странный пароль')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    await expect(page.locator('[class="error-button"]')).toBeVisible()
  })
})