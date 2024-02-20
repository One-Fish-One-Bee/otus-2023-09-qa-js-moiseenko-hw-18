
class CheckoutStepTwo {

    constructor(page) {
        this.page = page
        this.buttonCancel = page.locator('[name*=cancel]')
        this.buttonFinish = page.locator('[name*=finish]')
        this.labelSummaryTotal = page.locator('[class*=summary_total_label]')
    }

    async clickButtonCancel() {
        await this.buttonCancel.click()
    }

    async clickButtonFinish() {
        await this.buttonFinish.click()
    }

    async seeLabelSummaryTotal() {
        await this.labelSummaryTotal.waitFor({ state: "visible" })
    }

}

module.exports = CheckoutStepTwo