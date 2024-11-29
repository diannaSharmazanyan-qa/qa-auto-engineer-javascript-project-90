import {Page} from "@playwright/test";
import {IStatusData} from "../data/statusData";
import {BaseFormPage} from "./BaseFormPage";

export class CreateTaskStatusPage extends BaseFormPage{
    public nameInput = this.page.locator('#name')
    public slugInput = this.page.locator('#slug')


    constructor(page: Page) {
        super(page)
    }

    async createStatus(statusData: IStatusData) {
        const {name, slug} = statusData
        await this.nameInput.fill(name)
        await this.slugInput.fill(slug)
        await this.clickSaveButton()
    }
}