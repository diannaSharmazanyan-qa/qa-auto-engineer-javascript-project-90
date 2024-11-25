import {test} from "../base.fixture";

const labelName = 'testLabel'

test.describe('Лейблы', () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.open()
        await loginPage.auth()
        await loginPage.clickTab('Labels')
    })

    test.describe('Создание лейблов', async () => {
        test('Отображение создания формы лейбла', async({labelsPage, createLabelPage}) => {
            await labelsPage.clickCreateButton()
            await createLabelPage.checkRenderCreatePage()
        })

        test('Проверка, что лейбл корректно создался', async({labelsPage, createLabelPage}) => {
            await labelsPage.clickCreateButton()
            await createLabelPage.createLabel(labelName)
            await createLabelPage.clickTab('Labels')
            await labelsPage.checkLabelDataAfterCreate(labelName)
        })
    })

    test.describe('Список лейблов', async () => {
        test('Видимость списка статусов', async ({ labelsPage}) => {
            await labelsPage.checkLabelsBlockIsVisible()
        })

        test('Корректность отображения name и slug в блоке статусов', async ({labelsPage}) => {
            await labelsPage.checkDataLabelsBlock()
        })
    })

    test.describe('Редактирование лейблов', async () => {
        test('Видимость редактирования формы статуса', async ({ taskStatusEditPage, tasksStatusesPage}) => {
            await tasksStatusesPage.clickRow()
            await taskStatusEditPage.checkRenderEditPage()
        })

        test('После редактирования данные корректно сохраняются', async ({labelsPage, labelEditPage}) => {
            await labelsPage.clickRow()
            await labelEditPage.editLabelField(labelName)
            await labelsPage.checkValueInCellAfterUpdateLabel(labelName)
        })
    })


    test.describe('Удаление лейблов', async () => {
        test('Удаление одного лейбла', async ({labelsPage}) => {
            await labelsPage.selectOneRowViaCheckbox()
            await labelsPage.clickDeleteButton()
            await labelsPage.checkAfterDeleteCellIsNotVisible('bug')
        })

        test('Проверка, что выбраны все статусы для удаления', async ({labelsPage}) => {
            await labelsPage.selectAllRowsViaCheckbox()
            await labelsPage.checkCountSelectedItems()
        })

        test('Проверка, что все статусы удалены', async ({labelsPage}) => {
            await labelsPage.selectAllRowsViaCheckbox()
            await labelsPage.clickDeleteButton()
            await labelsPage.checkNoItemYetBlockIsVisible('No Label')
        })
    })
})