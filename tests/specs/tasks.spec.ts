import {test} from "../base.fixture";
import {taskData} from "../data/taskData";


test.describe('Статусы', () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.open()
        await loginPage.auth()
        await loginPage.clickTab('Tasks')
    })

    test.describe('Создание задач', async () => {
        test('Отображение создания формы задач', async({tasksPage}) => {
            await tasksPage.clickCreateButton()
            await tasksPage.checkRenderCreatePage()
        })

        test('Проверка, что задача корректно создалась', async ({tasksPage, createTaskPage}) => {
            await tasksPage.clickCreateButton()
            await createTaskPage.createTask(taskData)
            await createTaskPage.clickTab('Tasks')
            await tasksPage.checkTaskIsVisibleAfterCreate(taskData.title)
        })
    })

    test.describe('Список задач', async () => {
        test('Видимость списка задач', async ({ tasksPage}) => {
            await tasksPage.checkTasksBoardIsVisible()
        })

        test('Корректность отображения name, description и index в колонке To Review', async ({tasksPage}) => {
            await tasksPage.checkAllTitlesIsVisible()
        })
    })

    // test.describe('Список задач', async () => {
    //     test('Видимость списка статусов', async ({ tasksStatusesPage}) => {
    //         await tasksStatusesPage.checkTaskStatusesBlockIsVisible()
    //     })
    //
    //     test('Корректность отображения name и slug в блоке статусов', async ({tasksStatusesPage}) => {
    //         await tasksStatusesPage.checkDataStatusBlock()
    //     })
    // })
    //
    // test.describe('Редактирование задач', async () => {
    //     test('Видимость редактирования формы статуса', async ({ taskStatusEditPage, tasksStatusesPage}) => {
    //         await tasksStatusesPage.clickRow()
    //         await taskStatusEditPage.checkRenderEditPage()
    //     })
    //
    //     test('После редактирования данные корректно сохраняются', async ({taskStatusEditPage, tasksStatusesPage}) => {
    //         await tasksStatusesPage.clickRow()
    //         await taskStatusEditPage.editStatusFields(statusData)
    //         await tasksStatusesPage.checkStatusDataAfterUpdate(statusData)
    //     })
    // })
    //
    // test.describe('Удаление задач', async () => {
    //     test('Удаление одного статуса', async ({tasksStatusesPage}) => {
    //         await tasksStatusesPage.selectOneRowViaCheckbox()
    //         await tasksStatusesPage.clickDeleteButton()
    //         await tasksStatusesPage.checkAfterDeleteCellIsNotVisible('Draft')
    //     })
    //
    //     test('Проверка, что выбраны все статусы для удаления', async ({tasksStatusesPage}) => {
    //         await tasksStatusesPage.selectAllRowsViaCheckbox()
    //         await tasksStatusesPage.checkCountSelectedItems()
    //     })
    //
    //     test('Проверка, что все статусы удалены', async ({tasksStatusesPage}) => {
    //         await tasksStatusesPage.selectAllRowsViaCheckbox()
    //         await tasksStatusesPage.clickDeleteButton()
    //         await tasksStatusesPage.checkNoItemYetBlockIsVisible('No Task')
    //     })
    // })
})