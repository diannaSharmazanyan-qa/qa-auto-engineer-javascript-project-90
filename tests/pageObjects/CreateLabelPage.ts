import {Page} from "@playwright/test";
import {BaseFormPage} from "./base/BaseFormPage";

export class CreateLabelPage extends BaseFormPage{
    public nameInput = this.page.locator('#name')


    constructor(page: Page) {
        super(page)
    }


    async createLabel(labelName: string): Promise<void> {
        await this.nameInput.fill(labelName)
        await this.clickSaveButton()
    }
}