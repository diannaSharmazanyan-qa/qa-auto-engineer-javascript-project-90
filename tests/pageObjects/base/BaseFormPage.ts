import {PageHolder} from "./PageHolder";
import {expect, Page} from "@playwright/test";

export class BaseFormPage extends PageHolder {
    public saveButton = this.page.getByLabel('Save', {exact: true})
    public showButton = this.page.getByLabel('Show', {exact: true})
    public deleteButton = this.page.getByLabel('Delete', {exact: true})
    public editPage = this.page.locator('.edit-page')


    constructor(page: Page) {
        super(page);
    }

    async clickSaveButton() {
        await this.saveButton.click()
    }

    async clickDeleteButton() {
        await this.deleteButton.click()
    }


    async checkSaveButtonIsDisabled() {
        await expect(this.saveButton).toHaveAttribute('disabled')
    }

    async checkRenderCreatePage() {
        await this.checkSaveButtonIsDisabled()
        await expect(this.deleteButton).not.toBeVisible()
        await expect(this.showButton).not.toBeVisible()
    }

    async checkRenderEditPage() {
        await this.checkSaveButtonIsDisabled()
        await expect(this.editPage).toBeVisible()
        await expect(this.deleteButton).toBeVisible()
        await expect(this.showButton).toBeVisible()
    }
}