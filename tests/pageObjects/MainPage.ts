import {expect, Locator, Page} from "@playwright/test";

export class MainPage {
    public page: Page
    public elementCreatedBlock: Locator
    public profileIcon: Locator
    public logoutButton: Locator
    public tabButton: Locator


    constructor(page: Page) {
        this.page = page
        this.profileIcon = this.page.getByLabel('Profile')
        this.logoutButton = this.page.getByText('Logout')
        this.elementCreatedBlock = this.page.getByRole('presentation')
        this.tabButton = this.page.getByRole('menuitem')
    }

    async checkHeaderIsVisible() {
        await expect(this.page.getByText('Welcome')).toBeVisible()
    }

    async logout() {
        await this.profileIcon.click()
        await this.logoutButton.click()
    }

    async clickTab(tabName: string) {
        await this.tabButton.getByText(tabName).click()
    }
}