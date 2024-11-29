import {test} from "../base.fixture";
import {statusData} from "../data/statusData";


test.describe('Статусы', () => {
    test.beforeEach(async ({app: {loginPage, mainPage}}) => {
        await mainPage.clickTab('Task statuses')
    })

    test.describe('Создание статусов', async () => {
        test('Отображение создания формы статусов', async({app: {tasksStatusesPage, createTaskStatusPage}}) => {
            await tasksStatusesPage.clickCreateButton()
            await createTaskStatusPage.checkRenderCreatePage()
        })

        test('Проверка, что статус корректно создался', async ({app: {tasksStatusesPage, createTaskStatusPage, mainPage}}) => {
            await tasksStatusesPage.clickCreateButton()
            await createTaskStatusPage.createStatus(statusData)
            await mainPage.clickTab('Task statuses')
            await tasksStatusesPage.checkStatusDataAfterCreate(statusData)

        })
    })

    test.describe('Список статусов', async () => {
        test('Видимость списка статусов', async ({app: {tasksStatusesPage}}) => {
            await tasksStatusesPage.checkTaskStatusesBlockIsVisible()
        })

        test('Корректность отображения name и slug в блоке статусов', async ({app: {tasksStatusesPage}}) => {
            await tasksStatusesPage.checkDataStatusBlock()
        })
    })

    test.describe('Редактирование статусов', async () => {
        test('Видимость редактирования формы статуса', async ({app: {taskStatusEditPage, tasksStatusesPage}}) => {
            await tasksStatusesPage.clickRow()
            await taskStatusEditPage.checkRenderEditPage()
        })

        test('После редактирования данные корректно сохраняются', async ({app: {taskStatusEditPage, tasksStatusesPage}}) => {
            await tasksStatusesPage.clickRow()
            await taskStatusEditPage.editStatusFields(statusData)
            await tasksStatusesPage.checkStatusDataAfterUpdate(statusData)
        })
    })

    test.describe('Удаление статусов', async () => {
        test('Удаление одного статуса', async ({app: {tasksStatusesPage}}) => {
            await tasksStatusesPage.selectOneRowViaCheckbox()
            await tasksStatusesPage.clickDeleteButton()
            await tasksStatusesPage.checkAfterDeleteCellIsNotVisible('Draft')
        })

        test('Проверка, что выбраны все статусы для удаления', async ({app: {tasksStatusesPage}}) => {
            await tasksStatusesPage.selectAllRowsViaCheckbox()
            await tasksStatusesPage.checkCountSelectedItems()
        })

        test('Проверка, что все статусы удалены', async ({app: {tasksStatusesPage}}) => {
            await tasksStatusesPage.selectAllRowsViaCheckbox()
            await tasksStatusesPage.clickDeleteButton()
            await tasksStatusesPage.checkNoItemYetBlockIsVisible('No Task')
        })
    })
})