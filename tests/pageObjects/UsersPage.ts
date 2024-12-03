import {expect, Page} from "@playwright/test";
import {IRegistrationData} from "../data/registrationData";
import {BaseListPage} from "./base/BaseListPage";

export class UsersPage extends BaseListPage {
    public userBlock = this.page.locator('table')
    public userEmailCell = this.page.locator('tbody .column-email')
    public userFirstNameCell = this.page.locator('tbody .column-firstName')
    public userLastNameCell = this.page.locator('tbody .column-lastName')


    constructor(page: Page) {
        super(page)
    }

    async checkUserBlockIsVisible() {
        await expect(this.userBlock).toBeVisible()
    }

    async checkAllUsersEmailIsVisible() {
        for (const el of await this.userEmailCell.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkAllUsersFirstNameIsVisible() {
        for (const el of await this.userFirstNameCell.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkAllUsersLastNameIsVisible() {
        for (const el of await this.userLastNameCell.all()) {
            await expect(el).toBeVisible()
        }
    }

    async checkDataUserBlock() {
        await this.checkAllUsersEmailIsVisible()
        await this.checkAllUsersFirstNameIsVisible()
        await this.checkAllUsersLastNameIsVisible()
    }

    async checkAfterDeleteUserIsNotVisible(userEmail: string) {
        await expect(this.userEmailCell.getByText(userEmail)).not.toBeVisible()
    }

    async checkUserDataAfterUpdate(userData: IRegistrationData) {
        const {email, firstName, lastName} = userData

        expect(await this.userEmailCell.first().innerText()).toBe(email)
        expect(await this.userFirstNameCell.first().innerText()).toBe(firstName)
        expect(await this.userLastNameCell.first().innerText()).toBe(lastName)
    }

    async checkUserDataAfterCreate(userData: IRegistrationData) {
        const {email, firstName, lastName} = userData

        expect(await this.userEmailCell.last().innerText()).toBe(email)
        expect(await this.userFirstNameCell.last().innerText()).toBe(firstName)
        expect(await this.userLastNameCell.last().innerText()).toBe(lastName)
    }
}





