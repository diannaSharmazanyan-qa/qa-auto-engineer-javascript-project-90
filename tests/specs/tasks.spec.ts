import {test} from "../base.fixture";
import {taskData} from "../data/taskData";

const statuses = ['To Be Fixed', 'To Review', 'To Publish', 'Published', 'Draft']

const testArgs = [
    {
        statusName: 'To Review',
    },
    {
        statusName: 'To Be Fixed',

    },
    {
        statusName: 'Draft',
    },
]

test.describe('Задачи', () => {
    test.beforeEach(async ({app: {loginPage, mainPage}}) => {
        await mainPage.clickTab('Tasks')
    })

    test.describe('Создание задач', async () => {
        test('Отображение создания формы задач', async({app: {tasksPage, createTaskPage}}) => {
            await tasksPage.clickCreateButton()
            await createTaskPage.checkRenderCreatePage()
        })

        test('Проверка, что задача корректно создалась', async ({app: {tasksPage, createTaskPage, mainPage}}) => {
            await tasksPage.clickCreateButton()
            await createTaskPage.createTask(taskData)
            await mainPage.clickTab('Tasks')
            await tasksPage.checkTaskIsVisibleAfterCreate(taskData.title)
        })
    })

    test.describe('Список задач', async () => {
        test('Видимость списка задач', async ({app: {tasksPage}}) => {
            await tasksPage.checkTasksBoardIsVisible()
        })

        test('Корректность отображения name, description и index в колонке To Review', async ({app: {tasksPage}}) => {
            await tasksPage.checkTasksDataBlockInReviewColumn()
        })
    })

    test.describe('Редактирование задач', async () => {
        test('Видимость редактирования формы статуса', async ({ app: {taskEditPage, tasksPage}}) => {
            await tasksPage.clickEditButton()
            await taskEditPage.checkRenderEditPage()
        })

        test('После редактирования данные корректно сохраняются', async ({app: {tasksPage, taskEditPage}}) => {
            await tasksPage.clickEditButton()
            await taskEditPage.editTaskFields(taskData)
            await tasksPage.checkTaskDataAfterUpdate(taskData)
        })
    })

    test.describe('Фильтрация задач по статусам', async () => {
        testArgs.forEach((testArg) => {
            test(`При выборе статуса ${testArg.statusName} остальные статусы не отображаются`, async ({ app: {tasksPage} }) => {
                const filteredStatuses = statuses.filter((status) => status !== testArg.statusName)
                await tasksPage.clickStatusDropdown()
                await tasksPage.selectItemFromDropdown(testArg.statusName)
                await tasksPage.checkStatusesIsNotVisibleAfterFilter(filteredStatuses)

            })
        })
    })

    test.describe('Фильтрация задач по исполнителю', async () => {
        test('При выборе исполнителя peter отображаются задачи только в статусе Published', async ({app: {tasksPage}}) => {
            const statusesWithoutPublished = statuses.filter((status) => status !== 'Published')

            await tasksPage.clickAssigneeDropdown()
            await tasksPage.selectItemFromDropdown('peter')
            await tasksPage.checkStatusesIsNotVisibleAfterFilter(statusesWithoutPublished)
        })

        test('При выборе исполнителя alice отображаются задачи в статусе To Be Fixed и To Publish', async ({app: {tasksPage}}) => {
            const statusesWithoutToBeFixedAndToPublish = statuses.filter((status) => status !== 'To Be Fixed' && status !== 'To Publish')

            await tasksPage.clickAssigneeDropdown()
            await tasksPage.selectItemFromDropdown('alice')
            await tasksPage.checkStatusesIsNotVisibleAfterFilter(statusesWithoutToBeFixedAndToPublish)
        })
    })

    test.describe('Фильтрация по лейблу', async () => {
        test('При выборе лейбла critical отображаются задачи только в статусе Published', async({app: {tasksPage}}) => {
            const statusesWithoutPublished = statuses.filter((status) => status !== 'Published')

            await tasksPage.clickLabelDropdown()
            await tasksPage.selectItemFromDropdown('critical')
            await tasksPage.checkStatusesIsNotVisibleAfterFilter(statusesWithoutPublished)
        })

        test('При выборе лейбла feature отображаются задачи в статусе Published и To Be Fixed', async({app: {tasksPage}}) => {
            const statusesWithoutPublishedAndToBeFixed = statuses.filter((status) => status !== 'Published' && status !== 'To Be Fixed')

            await tasksPage.clickLabelDropdown()
            await tasksPage.selectItemFromDropdown('feature')
            await tasksPage.checkStatusesIsNotVisibleAfterFilter(statusesWithoutPublishedAndToBeFixed)
        })
    })

    test('Перетаскивание карточки из статуса Published в To Be Fixed с лейблом feature', async ({app: {tasksPage}}) => {
            const statusesWithoutPublishedAndToBeFixed = statuses.filter((status) => status !== 'Published' && status !== 'To Be Fixed')

            await tasksPage.clickLabelDropdown()
            await tasksPage.selectItemFromDropdown('feature')
            await tasksPage.checkStatusesIsNotVisibleAfterFilter(statusesWithoutPublishedAndToBeFixed)
            await tasksPage.dragAndDropCard()
            await tasksPage.checkStatusIsNotVisibleAfterDragAndDrop()
        })
})