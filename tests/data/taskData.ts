import {faker} from '@faker-js/faker';


export type ITaskData = {
    title: string
    content: string
}

export const taskData: ITaskData = {
    title: faker.lorem.sentence().slice(0, 4).trim(),
    content: faker.lorem.sentence().slice(0, 5).trim(),
}