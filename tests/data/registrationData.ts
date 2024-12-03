import {faker} from "@faker-js/faker";

export type IRegistrationData = {
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
}

export const registrationData: IRegistrationData = {
    email: faker.internet.email().trim(),
    firstName: faker.person.firstName().trim(),
    lastName: faker.person.lastName().trim(),
    password: faker.internet.password().trim()
}
