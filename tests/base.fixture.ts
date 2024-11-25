import {test as base} from '@playwright/test'
import {LoginPage} from "./pageObjects/LoginPage";
import {UsersPage} from "./pageObjects/UsersPage";
import {CreateUserPage} from "./pageObjects/CreateUserPage";
import {UserEditPage} from "./pageObjects/UserEditPage";
import {TasksStatusesPage} from "./pageObjects/TasksStatusesPage";
import {CreateTaskStatusPage} from "./pageObjects/CreateTaskStatusPage";
import {TaskStatusEditPage} from "./pageObjects/TaskStatusEditPage";
import {LabelsPage} from "./pageObjects/LabelsPage";
import {CreateLabelPage} from "./pageObjects/CreateLabelPage";
import {LabelEditPage} from "./pageObjects/LabelEditPage";
import {TasksPage} from "./pageObjects/TasksPage";
import {TaskEditPage} from "./pageObjects/TaskEditPage";
import {CreateTaskPage} from "./pageObjects/CreateTaskPage";

type TestFixtures = {
    loginPage: LoginPage
    usersPage: UsersPage
    createPage: CreateUserPage
    userEditPage: UserEditPage
    tasksStatusesPage: TasksStatusesPage
    taskStatusEditPage: TaskStatusEditPage,
    createTaskStatusPage: CreateTaskStatusPage
    labelsPage: LabelsPage
    createLabelPage: CreateLabelPage
    labelEditPage: LabelEditPage
    tasksPage: TasksPage
    taskEditPage: TaskEditPage
    createTaskPage: CreateTaskPage
}

const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)

        await use(loginPage)
    },

    usersPage: async ({ page }, use) => {
        const usersPage = new UsersPage(page)

        await use(usersPage)
    },

    createPage: async ({ page }, use) => {
        const createPage = new CreateUserPage(page)

        await use(createPage)
    },

    userEditPage: async ({ page }, use) => {
        const userEditPage = new UserEditPage(page)

        await use(userEditPage)
    },

    tasksStatusesPage: async ({ page }, use) => {
        const tasksStatusesPage = new TasksStatusesPage(page)

        await use(tasksStatusesPage)
    },

    createTaskStatusPage: async ({ page }, use) => {
        const createTaskStatusPage = new CreateTaskStatusPage(page)

        await use(createTaskStatusPage)
    },

    taskStatusEditPage: async ({ page }, use) => {
        const taskStatusEditPage = new TaskStatusEditPage(page)

        await use(taskStatusEditPage)
    },

    labelsPage: async ({ page }, use) => {
        const labelsPage = new LabelsPage(page)

        await use(labelsPage)
    },

    createLabelPage: async ({ page }, use) => {
        const createLabelPage = new CreateLabelPage(page)

        await use(createLabelPage)
    },

    labelEditPage: async ({ page }, use) => {
        const labelEditPage = new LabelEditPage(page)

        await use(labelEditPage)
    },

    tasksPage: async ({ page }, use) => {
        const tasksPage = new TasksPage(page)

        await use(tasksPage)
    },

    taskEditPage: async ({ page }, use) => {
        const tasksEditPge = new TaskEditPage(page)

        await use(tasksEditPge)
    },

    createTaskPage: async ({ page }, use) => {
        const createTaskPage = new CreateTaskPage(page)

        await use(createTaskPage)
    },


})

export { test }
