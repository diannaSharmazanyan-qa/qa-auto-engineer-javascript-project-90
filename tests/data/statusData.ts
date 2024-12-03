import {faker} from "@faker-js/faker";

export type IStatusData = {
    name: string
    slug: string
}

export const statusData: IStatusData = {
    name: faker.person.firstName().trim(),
    slug: faker.person.zodiacSign().trim(),
}