
class ProductsPage {

    constructor(page) {
        this.page = page
        this.titlePage = page.locator('[class="title"]')
        this.buttonAddToCartSauceBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')

    }

    async clickButtonAddToCartSauceBikeLight() {
        await this.buttonAddToCartSauceBikeLight.click()
    }

    async checkTitlePage() {
        await this.titlePage.waitFor({ state: 'visible' })
    }

}

module.exports = ProductsPage