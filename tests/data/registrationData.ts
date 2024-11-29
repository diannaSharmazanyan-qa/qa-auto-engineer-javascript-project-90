import {faker} from "@faker-js/faker";

export type IRegistrationData = {
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
}

export const registrationData: IRegistrationData = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password()
}
