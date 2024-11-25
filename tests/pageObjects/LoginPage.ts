import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage{
    public usernameInput = this.page.locator('#username')
    public passwordInput = this.page.locator('#password')
    public signInButton = this.page.locator('[type="submit"]')
    public authBlock = this.page.locator('.RaLogin-card')
    public url = '/login'

    constructor(page: Page) {
        super(page)
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