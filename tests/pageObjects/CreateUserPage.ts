import {Page} from "@playwright/test";
import {IRegistrationData} from "../data/registrationData";
import {BaseFormPage} from "./BaseFormPage";

export class CreateUserPage extends BaseFormPage{
    public emailInput = this.page.locator('#email')
    public firstNameInput = this.page.locator('#firstName')
    public lastNameInput = this.page.locator('#lastName')
    public passwordInput = this.page.locator('#password')

    constructor(page: Page) {
        super(page);
    }

    async createUser(dataForRegistration: IRegistrationData) {
        const {email, firstName, lastName, password} = dataForRegistration

        await this.emailInput.fill(email)
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.passwordInput.fill(password)
        await this.clickSaveButton()
    }
}