import {BasePage} from "./BasePage";
import {expect, Page} from "@playwright/test";

export class TasksPage extends BasePage {
    public tasksBoard = this.page.locator('.RaLayout-content')
    public taskTitle = this.page.locator("xpath=//*[contains(text(),'To Review')]//following-sibling::div//*[contains(@class, 'MuiCardContent')]/div")
    public taskDescription = this.page.locator('')
    public taskIndex = this.page.locator('')

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

    async checkAllDescriptionsAndIndicesIsVisible() {
        for (const el of await this.taskTitle.all()) {
            await expect(el).toBeVisible()
        }
    }
}
