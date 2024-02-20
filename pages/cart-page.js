
class CartPage {

    constructor(page) {
        this.page = page
        this.oneInventoryItemName = page.locator('[class*=inventory_item_name]')
        this.buttonContinueShopping = page.locator('[name*=continue-shopping]')
        this.buttonCheckout = page.locator('[name*=checkout]')
    }

    async clickButtonContinueShopping() {
        await this.buttonContinueShopping.click()
    }

    async clickButtonCheckout() {
        await this.buttonCheckout.click()
    }

}

module.exports = CartPage