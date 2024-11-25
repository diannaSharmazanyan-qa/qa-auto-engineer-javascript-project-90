import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {ITaskData, taskData} from "../data/taskData";

export class CreateTaskPage extends BasePage {
    public assigneeDropdown = this.page.getByLabel('Assignee')
    public assigneeDropdownBlock = this.page.locator('#assignee_id-option-0')
    public titleInput = this.page.locator('#title')
    public contentInput = this.page.locator('#content')
    public statusDropdown = this.page.getByLabel('Status')
    public statusDropdownBlock = this.page.getByRole('option', { name: 'To Review' })
    public labelDropdown = this.page.getByLabel('Label')
    public labelDropdownBlock = this.page.getByRole('option', { name: 'critical' })

    constructor(page: Page) {
        super(page);
    }


    // taskData: ITaskData
    async createTask(taskData: ITaskData) {
        const {title, content} = taskData
        await this.assigneeDropdown.click()
        await this.assigneeDropdownBlock.click()
        await this.titleInput.fill(title)
        await this.contentInput.fill(content)
        await this.statusDropdown.click()
        await this.statusDropdownBlock.click()
        await this.labelDropdown.click()
        await this.labelDropdownBlock.click()
        await this.labelDropdownBlock.click({force: true, position: {x: 180, y: 30}})
        await this.clickSaveButton()
    }
}