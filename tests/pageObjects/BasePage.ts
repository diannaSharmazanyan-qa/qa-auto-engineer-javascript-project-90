import {expect, Locator, Page} from "@playwright/test";

export class BasePage {
    public page: Page
    public showButton: Locator
    public deleteButton: Locator
    public createButton: Locator
    public saveButton: Locator
    public elementCreatedBlock: Locator
    public allRowsCheckbox: Locator
    public rowCheckbox: Locator
    public idCells: Locator
    public nameCell: Locator
    public headerWithCountSelectedItems: Locator
    public profileIcon: Locator
    public logoutButton: Locator
    public tabButton: Locator
    public row: Locator


    constructor(page: Page) {
        this.page = page
        this.profileIcon = this.page.getByLabel('Profile')
        this.logoutButton = this.page.getByText('Logout')
        this.saveButton = this.page.getByLabel('Save', {exact: true})
        this.headerWithCountSelectedItems = this.page.getByRole('heading', { name: 'items selected' })
        this.idCells = this.page.locator('.column-id')
        this.nameCell = this.page.locator('.column-name')
        this.deleteButton = this.page.getByLabel('Delete', {exact: true})
        this.showButton = this.page.getByLabel('Show', {exact: true})
        this.createButton = this.page.getByLabel('Create', {exact: true})
        this.rowCheckbox = this.page.getByLabel('Select this row')
        this.allRowsCheckbox = this.page.getByLabel('Select all')
        this.elementCreatedBlock = this.page.getByRole('presentation')
        this.tabButton = this.page.getByRole('menuitem')
        this.row = this.page.locator('tbody tr')
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

    async clickDeleteButton() {
        await this.deleteButton.click()
    }

    async clickCreateButton() {
        await this.createButton.click()
    }

    async clickSaveButton() {
        await this.saveButton.click()
    }

    async checkSaveButtonIsDisabled() {
        await expect(this.saveButton).toHaveAttribute('disabled')
    }

    async selectAllRowsViaCheckbox() {
        await this.allRowsCheckbox.click()
    }

    async selectOneRowViaCheckbox(i = 0) {
        await this.rowCheckbox.nth(i).click()
    }

    async getCountRowsFromTable(): Promise<string> {
        return await this.idCells.last().innerText()
    }

    async checkCountSelectedItems() {
        const rowsCount = await this.getCountRowsFromTable()
        expect(await this.headerWithCountSelectedItems.innerText()).toContain(rowsCount)
    }

    async checkNoItemYetBlockIsVisible(itemText: string) {
        await expect(this.page.getByText(itemText)).toBeVisible()
    }

    async checkRenderCreatePage() {
        await this.checkSaveButtonIsDisabled()
        await expect(this.deleteButton).not.toBeVisible()
        await expect(this.showButton).not.toBeVisible()
    }

    async checkRenderEditPage() {
        await this.checkSaveButtonIsDisabled()
        await expect(this.deleteButton).toBeVisible()
        await expect(this.showButton).toBeVisible()
    }

    async clickRow(i = 0) {
        await this.row.nth(i).click()
    }

    async checkAfterDeleteCellIsNotVisible(nameCell: string) {
        await expect(this.nameCell.getByText(nameCell, {exact: true})).not.toBeVisible()
    }
}