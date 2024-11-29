import {PageHolder} from "./PageHolder";
import {expect, Page} from "@playwright/test";

export class BaseListPage extends PageHolder {
    public rowCheckbox = this.page.getByLabel('Select this row')
    public allRowsCheckbox = this.page.getByLabel('Select all')
    public createButton = this.page.getByLabel('Create', {exact: true})
    public idCells = this.page.locator('.column-id')
    public headerWithCountSelectedItems = this.page.getByRole('heading', { name: 'items selected' })
    public nameCell = this.page.locator('.column-name')
    public row = this.page.locator('tbody tr')
    public deleteButton = this.page.getByLabel('Delete', {exact: true})


    constructor(page: Page) {
        super(page);
    }

    async clickDeleteButton() {
        await this.deleteButton.click()
    }

    async clickCreateButton() {
        await this.createButton.click()
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

    async checkAfterDeleteCellIsNotVisible(nameCell: string) {
        await expect(this.nameCell.getByText(nameCell, {exact: true})).not.toBeVisible()
    }

    async checkNoItemYetBlockIsVisible(itemText: string) {
        await expect(this.page.getByText(itemText)).toBeVisible()
    }

    async clickRow(i = 0) {
        await this.row.nth(i).click()
    }
}