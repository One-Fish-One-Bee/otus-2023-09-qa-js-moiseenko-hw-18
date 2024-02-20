
const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/login-page')
const Header = require('../pages/fragments/header')
const ProductsPage = require('../pages/products-page')
const CartPage = require('../pages/cart-page')
const CheckoutStepOne = require('../pages/checkout-step-one')
const CheckoutStepTwo = require('../pages/checkout-step-two')
const CheckoutComplete = require('../pages/checkout-compalete')


test.describe('Критичные пути пользователя: Open baseUrl, Login and Logout', () => {
    test('Open baseUrl', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()

        await expect(page).toHaveURL('https://www.saucedemo.com/')
    })

    test('Login standard_user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })

    test('Logout standard_user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const header = new Header(page)
        await header.clickButtonMenu()
        await header.clickLinkLogout()

        await expect(page).toHaveURL('https://www.saucedemo.com')
    })
})

test.describe('Критичные пути пользователя: Оформление заказа', () => {
    test('Add to cart, Sauce Labs Bike Light', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.focusSpanBadgeCart()

        await expect(page.locator('[class*=shopping_cart_badge]')).toHaveCount(1)
    })

    test('go to the Cart', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    })

    test('the added item is in the cart', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        await expect(page.locator('[class*=inventory_item_name]')).toHaveText('Sauce Labs Bike Light')
    })

    test('go to Chekout-Step-One', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        const cartPage = new CartPage(page)
        await cartPage.clickButtonCheckout()

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    })

    test('go to Chekout-Step-Two', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        const cartPage = new CartPage(page)
        await cartPage.clickButtonCheckout()

        const checkoutStepOne = new CheckoutStepOne(page)
        await checkoutStepOne.fillCheckoutForm('Andrey', 'Mois', '11')
        await checkoutStepOne.clickButtonContinue()

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    })

    test('total amount $10.79', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        const cartPage = new CartPage(page)
        await cartPage.clickButtonCheckout()

        const checkoutStepOne = new CheckoutStepOne(page)
        await checkoutStepOne.fillCheckoutForm('Andrey', 'Mois', '11')
        await checkoutStepOne.clickButtonContinue()

        const checkoutStepTwo = new CheckoutStepTwo(page)

        await expect(checkoutStepTwo.labelSummaryTotal).toContainText('Total: $', '10.79')
    })

    test('go to Chekout-Complete!', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        const cartPage = new CartPage(page)
        await cartPage.clickButtonCheckout()

        const checkoutStepOne = new CheckoutStepOne(page)
        await checkoutStepOne.fillCheckoutForm('Andrey', 'Mois', '11')
        await checkoutStepOne.clickButtonContinue()

        const checkoutStepTwo = new CheckoutStepTwo(page)
        await checkoutStepTwo.clickButtonFinish()

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    })

    test('under the page title - Thank you for your order!', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.open()
        await loginPage.fillLoginForm('standard_user', 'secret_sauce')
        await loginPage.clickButtonLogin()

        const productsPage = new ProductsPage(page)
        await productsPage.clickButtonAddToCartSauceBikeLight()

        const header = new Header(page)
        await header.clickLinkShoppingCart()

        const cartPage = new CartPage(page)
        await cartPage.clickButtonCheckout()

        const checkoutStepOne = new CheckoutStepOne(page)
        await checkoutStepOne.fillCheckoutForm('Andrey', 'Mois', '11')
        await checkoutStepOne.clickButtonContinue()

        const checkoutStepTwo = new CheckoutStepTwo(page)
        await checkoutStepTwo.clickButtonFinish()

        const checkoutComplete = new CheckoutComplete(page)

        await expect(checkoutComplete.headerComplete).toContainText('Thank you for your order!')
    })

})