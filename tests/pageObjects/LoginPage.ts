import {expect, Locator, Page} from "@playwright/test";

export class LoginPage{
    page: Page
    public usernameInput: Locator
    public passwordInput: Locator
    public signInButton: Locator
    public authBlock: Locator
    public url = '/login'

    constructor(page: Page) {
        this.page = page
        this.usernameInput = this.page.locator('#username')
        this.passwordInput = this.page.locator('#password')
        this.signInButton = this.page.locator('[type="submit"]')
        this.authBlock = this.page.locator('.RaLogin-card')
    }

    async open() {
        await this.page.goto(this.url)
    }

    async auth() {
        await this.usernameInput.fill('admin')
        await this.passwordInput.fill('admin')
        await this.signInButton.click()
    }

    async checkIsVisibleAuthForm() {
        await expect(this.authBlock).toBeVisible()
    }

}