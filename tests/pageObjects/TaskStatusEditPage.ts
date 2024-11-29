import {Page} from "@playwright/test";
import {IStatusData} from "../data/statusData";
import {BaseFormPage} from "./BaseFormPage";

export class TaskStatusEditPage extends BaseFormPage {
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