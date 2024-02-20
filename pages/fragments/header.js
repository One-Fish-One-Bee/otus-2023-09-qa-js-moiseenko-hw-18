
class Header {
    constructor(page) {
        this.page = page
        this.root = page.locator('[class*=primary_header]')
        this.labelHeader = page.locator('[class*=header_label]')
        this.linkShoppingCart = page.locator('[class*=shopping_cart_link]')
        this.spanBadgeCart = page.locator('[class*=shopping_cart_badge]')
        this.buttonMenu = page.locator('[class*=bm-burger-button]')
        this.linkLogout = page.locator('[id=logout_sidebar_link]')
    }

    async clickButtonMenu() {
        await this.buttonMenu.click()
    }

    async clickLinkLogout() {
        await this.linkLogout.click()
    }

    async clickLinkShoppingCart() {
        await this.linkShoppingCart.click()
    }

    async focusSpanBadgeCart() {
        await this.linkShoppingCart.focus()
    }

}

module.exports = Header