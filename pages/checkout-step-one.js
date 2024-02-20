
class CheckoutStepOne {

    constructor(page) {
        this.page = page
        this.buttonCancel = page.locator('[name*=cancel]')
        this.buttonContinue = page.locator('[name*=continue]')
        this.inputFirstName = page.locator('[name*=firstName]')
        this.inputLastName = page.locator('[name*=lastName]')
        this.inputPostalCode = page.locator('[name*=postalCode]')
    }

    async fillCheckoutForm(firstname, lastname, code){
        await this.inputFirstName.fill(firstname)
        await this.inputLastName.fill(lastname)
        await this.inputPostalCode.fill(code)
    }

    async clickButtonCancel() {
        await this.buttonCancel.click()
    }

    async clickButtonContinue() {
        await this.buttonContinue.click()
    }

}

module.exports = CheckoutStepOne