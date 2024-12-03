import {expect, Page} from "@playwright/test";
import {BaseListPage} from "./base/BaseListPage";
import {ITaskData} from "../data/taskData";

export class TasksPage extends BaseListPage {
    public tasksBoard = this.page.locator('.RaLayout-content')
    public taskTitle = this.page.locator("xpath=//*[contains(text(),'To Review')]//following-sibling::div//*[contains(@class, 'MuiCardContent')]/div")
    public taskDescription = this.page.locator("xpath=//*[contains(text(),'To Review')]//following-sibling::div//*[contains(@class, 'MuiCardContent')]/p[1]")
    public taskIndex = this.page.locator("//*[contains(text(),'To Review')]//following-sibling::div//*[contains(@class, 'MuiCardContent')]/p[2]")
    public firstCardInToReviewColumn = this.page.locator('[data-rfd-drag-handle-draggable-id="2"]')
    public editButton = this.firstCardInToReviewColumn.getByLabel('Edit')
    public statusDropdown = this.page.getByLabel('Status')
    public assigneeDropdown = this.page.getByLabel('Assignee')
    public labelDropdown = this.page.getByLabel('Label')
    public dropdownBlock = this.page.getByRole('listbox')
    public cardInPublishedColumn = this.page.locator('xpath=//*[contains(text(), "Published")]/following-sibling::*')

    constructor(page: Page) {
        super(page);
    }

    async checkTaskIsVisibleAfterCreate(taskName: string) {
        await expect(this.page.getByText(taskName)).toBeVisible()
    }

    async checkTasksBoardIsVisible() {
        await expect(this.tasksBoard).toBeVisible()
    }

    async checkAllTitlesIsVisible() {
        for (const el of await this.taskTitle.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkAllDescriptionsIsVisible() {
        for (const el of await this.taskDescription.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkAllIndicesIsVisible() {
        for (const el of await this.taskIndex.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkTasksDataBlockInReviewColumn() {
        await this.checkAllTitlesIsVisible()
        await this.checkAllDescriptionsIsVisible()
        await this.checkAllIndicesIsVisible()
    }

    async clickEditButton() {
        await this.editButton.click()
    }

    async checkTaskDataAfterUpdate(taskData: ITaskData) {
        const {title, content} = taskData

        expect(await this.taskTitle.first().innerText()).toBe(title)
        expect(await this.taskDescription.first().innerText()).toBe(content)
    }

    async checkStatusesIsNotVisibleAfterFilter(statuses: string[]) {
        for (const status of statuses) {
            await expect(this.page.locator(`(//*[contains(text(), '${status}')]//..)[1]`)).not.toBeVisible()
        }
    }

    async checkStatusIsNotVisibleAfterDragAndDrop(status = 'Published') {
        await expect(this.page.locator(`xpath=//*[contains(text(), '${status}')]`)).not.toBeVisible()
    }

    async clickStatusDropdown() {
        await this.statusDropdown.click()
    }

    async clickAssigneeDropdown() {
        await this.assigneeDropdown.click()
    }

    async clickLabelDropdown() {
        await this.labelDropdown.click()
    }

    async selectItemFromDropdown(statusName: string) {
        await this.dropdownBlock.getByText(statusName).click()
    }

    async dragAndDropCard() {
        await this.cardInPublishedColumn.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(1, 1);
        await this.page.mouse.move(400, 0);
        await this.page.mouse.up();
        await expect(this.cardInPublishedColumn).not.toBeVisible()
    }
}
