import {faker} from '@faker-js/faker';


export type ITaskData = {
    title: string
    content: string
}

export const taskData: ITaskData = {
    title: faker.lorem.sentence().slice(0, 5),
    content: faker.lorem.sentence().slice(0, 5),
}