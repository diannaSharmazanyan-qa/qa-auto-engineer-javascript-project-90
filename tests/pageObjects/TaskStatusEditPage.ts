import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {IStatusData} from "../data/statusData";

export class TaskStatusEditPage extends BasePage {
    public nameInput = this.page.locator('#name')
    public slugInput = this.page.locator('#slug')

    constructor(page: Page) {
        super(page);
    }

    async editStatusFields(statusEditData: IStatusData) {
        const {name, slug} = statusEditData

        await this.nameInput.fill(name)
        await this.slugInput.fill(slug)
        await this.clickSaveButton()
    }
}