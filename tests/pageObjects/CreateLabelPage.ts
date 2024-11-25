import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class CreateLabelPage extends BasePage{
    public nameInput = this.page.locator('#name')


    constructor(page: Page) {
        super(page)
    }


    async createLabel(labelName: string): Promise<void> {
        await this.nameInput.fill(labelName)
        await this.clickSaveButton()
    }
}