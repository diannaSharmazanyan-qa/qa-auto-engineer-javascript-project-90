import {expect, Page} from "@playwright/test";
import {IRegistrationData} from "../data/registrationData";
import {BasePage} from "./BasePage";


export class UserEditPage extends BasePage{
    public emailInput = this.page.locator('#email')
    public firstNameInput = this.page.locator('#firstName')
    public lastNameInput = this.page.locator('#lastName')

    constructor(page: Page) {
        super(page)
    }

    async checkInputsValues(email: string, firstName: string, lastName: string) {
        expect(await this.emailInput.getAttribute('value')).toBe(email)
        expect(await this.firstNameInput.getAttribute('value')).toBe(firstName)
        expect(await this.lastNameInput.getAttribute('value')).toBe(lastName)
    }


    async editUserData(userData: IRegistrationData) {
        const {email, firstName, lastName} = userData

        await this.emailInput.fill(email)
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.clickSaveButton()
    }

    async changeUserDataToEmpty() {
        await this.emailInput.fill('')
        await this.firstNameInput.fill('')
        await this.lastNameInput.fill('')
        await this.clickSaveButton()
    }

    async changeEmailToInvalidValue(invalidValue: string) {
        await this.emailInput.fill(invalidValue)
        await this.clickSaveButton()
    }
}





