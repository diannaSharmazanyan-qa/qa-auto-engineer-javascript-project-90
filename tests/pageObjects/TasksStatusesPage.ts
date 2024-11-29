import {expect, Page} from "@playwright/test";
import {IStatusData} from "../data/statusData";
import {BaseListPage} from "./BaseListPage";


export class TasksStatusesPage extends BaseListPage {
    public taskStatusesBlock = this.page.locator('table')
    public nameCell = this.page.locator('tbody .column-name')
    public slugCell = this.page.locator('tbody .column-slug')

    constructor(page: Page) {
        super(page)
    }

    async checkTaskStatusesBlockIsVisible() {
        await expect(this.taskStatusesBlock).toBeVisible()
    }

    async checkAllNamesIsVisible() {
        for (const el of await this.nameCell.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkAllSlugsIsVisible() {
        for (const el of await this.slugCell.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkDataStatusBlock() {
        await this.checkAllNamesIsVisible()
        await this.checkAllSlugsIsVisible()
    }

    async checkStatusDataAfterUpdate(statusEditData: IStatusData) {
        const {name, slug} = statusEditData

        expect(await this.nameCell.first().innerText()).toBe(name)
        expect(await this.slugCell.first().innerText()).toBe(slug)
    }

    async checkStatusDataAfterCreate(statusData: IStatusData) {
        const {name, slug} = statusData
        expect(await this.nameCell.last().innerText()).toBe(name)
        expect(await this.slugCell.last().innerText()).toBe(slug)
    }
}





