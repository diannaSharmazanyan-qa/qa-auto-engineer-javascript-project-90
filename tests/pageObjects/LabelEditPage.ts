import {Page} from "@playwright/test";
import {BaseFormPage} from "./base/BaseFormPage";

export class LabelEditPage extends BaseFormPage {
    public nameInput = this.page.locator('#name')

    constructor(page: Page) {
        super(page);
    }

    async editLabelField(labelName: string) {
        await this.nameInput.fill(labelName)
        await this.clickSaveButton()
    }

}