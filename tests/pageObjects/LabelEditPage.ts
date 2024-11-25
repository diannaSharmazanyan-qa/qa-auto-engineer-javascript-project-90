import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export class LabelEditPage extends BasePage {
    public nameInput = this.page.locator('#name')

    constructor(page: Page) {
        super(page);
    }

    async editLabelField(labelName: string) {
        await this.nameInput.fill(labelName)
        await this.clickSaveButton()
    }

}