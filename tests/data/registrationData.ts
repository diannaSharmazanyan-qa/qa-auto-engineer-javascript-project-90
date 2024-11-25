export type IRegistrationData = {
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
}

export const registrationData: IRegistrationData = {
    email: 'test@mail.ru',
    firstName: 'test',
    lastName: 'user',
    password: 'password',
}