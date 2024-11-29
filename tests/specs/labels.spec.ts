import {test} from "../base.fixture";
import {faker} from "@faker-js/faker";


const labelName = faker.company.name()

test.describe('Лейблы', () => {
    test.beforeEach(async ({app: {loginPage, mainPage}}) => {
        await mainPage.clickTab('Labels')
    })

    test.describe('Создание лейблов', async () => {
        test('Отображение создания формы лейбла', async({app: {labelsPage, createLabelPage}}) => {
            await labelsPage.clickCreateButton()
            await createLabelPage.checkRenderCreatePage()
        })

        test('Проверка, что лейбл корректно создался', async({app: {labelsPage, createLabelPage, mainPage}}) => {
            await labelsPage.clickCreateButton()
            await createLabelPage.createLabel(labelName)
            await mainPage.clickTab('Labels')
            await labelsPage.checkLabelDataAfterCreate(labelName)
        })
    })

    test.describe('Список лейблов', async () => {
        test('Видимость списка статусов', async ({ app: {labelsPage}}) => {
            await labelsPage.checkLabelsBlockIsVisible()
        })

        test('Корректность отображения name и slug в блоке статусов', async ({app: {labelsPage}}) => {
            await labelsPage.checkDataLabelsBlock()
        })
    })

    test.describe('Редактирование лейблов', async () => {
        test('Видимость редактирования формы статуса', async ({app: {taskStatusEditPage, tasksStatusesPage}}) => {
            await tasksStatusesPage.clickRow()
            await taskStatusEditPage.checkRenderEditPage()
        })

        test('После редактирования данные корректно сохраняются', async ({app: {labelsPage, labelEditPage}}) => {
            await labelsPage.clickRow()
            await labelEditPage.editLabelField(labelName)
            await labelsPage.checkValueInCellAfterUpdateLabel(labelName)
        })
    })


    test.describe('Удаление лейблов', async () => {
        test('Удаление одного лейбла', async ({app: {labelsPage}}) => {
            await labelsPage.selectOneRowViaCheckbox()
            await labelsPage.clickDeleteButton()
            await labelsPage.checkAfterDeleteCellIsNotVisible('bug')
        })

        test('Проверка, что выбраны все статусы для удаления', async ({app: {labelsPage}}) => {
            await labelsPage.selectAllRowsViaCheckbox()
            await labelsPage.checkCountSelectedItems()
        })

        test('Проверка, что все статусы удалены', async ({app: {labelsPage}}) => {
            await labelsPage.selectAllRowsViaCheckbox()
            await labelsPage.clickDeleteButton()
            await labelsPage.checkNoItemYetBlockIsVisible('No Label')
        })
    })
})