
class CheckoutComplete {

    constructor(page) {
        this.page = page
        this.headerComplete = page.locator('[class*=complete-header]')
    }

}

module.exports = CheckoutComplete