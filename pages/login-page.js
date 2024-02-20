
class LoginPage {

    constructor(page) {
        this.page = page
        this.inputEmail = page.locator('[data-test="username"]')
        this.inputPassword = page.locator('[data-test="password"]')
        this.buttonLogin = page.locator('[data-test="login-button"]')
    }

    async fillLoginForm(login, password) {
        await this.inputEmail.fill(login)
        await this.inputPassword.fill(password)
    }

    async clickButtonLogin() {
        await this.buttonLogin.click()
    }

    async open() {
        await this.page.goto('/')
    }

}

module.exports = LoginPage