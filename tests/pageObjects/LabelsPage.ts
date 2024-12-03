import {expect, Page} from "@playwright/test";
import {BaseListPage} from "./base/BaseListPage";

export class LabelsPage extends BaseListPage{
    public nameCell = this.page.locator('tbody .column-name');
    public labelsBlock = this.page.locator('table')


    constructor(page: Page) {
        super(page);
    }

    async checkLabelDataAfterCreate(labelName: string) {
        expect(await this.nameCell.last().innerText()).toBe(labelName);
    }

    async checkLabelsBlockIsVisible() {
        await expect(this.labelsBlock).toBeVisible()
    }

    async checkDataLabelsBlock() {
        for (const el of await this.nameCell.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkValueInCellAfterUpdateLabel(labelName: string, i = 0) {
        expect(await this.nameCell.nth(i).innerText()).toBe(labelName)
    }
}