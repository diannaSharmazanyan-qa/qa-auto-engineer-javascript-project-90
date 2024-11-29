import {Page} from "@playwright/test";
import {BaseFormPage} from "./BaseFormPage";
import {ITaskData} from "../data/taskData";

export class TaskEditPage extends BaseFormPage{
    public titleInput = this.page.locator('#title')
    public contentInput = this.page.locator('#content')

    constructor(page: Page) {
        super(page);
    }

    async editTaskFields(taskData: ITaskData) {
        const {title, content} = taskData

        await this.titleInput.fill(title)
        await this.contentInput.fill(content)
        await this.clickSaveButton()
    }
}