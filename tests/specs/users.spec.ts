import {test} from "../base.fixture";
import {registrationData} from "../data/registrationData";

const invalidEmail = '123'


test.describe("Пользователи", async () => {
    test.beforeEach(async ({loginPage}) => {
        await loginPage.open()
        await loginPage.auth()
        await loginPage.clickTab('Users')
    })

    test.describe('Создание пользователей', async () => {
        test('Проверка, что пользователь создался и данные сохранились корректно', async ({createPage, usersPage}) => {
            await usersPage.clickCreateButton()
            await createPage.createUser(registrationData)
            await createPage.clickTab('Users')
            await usersPage.checkUserDataAfterCreate(registrationData)
        })

        test('Корректное отображение формы создания пользователя', async ({createPage, usersPage}) => {
            await usersPage.clickCreateButton()
            await createPage.checkRenderCreatePage()
        })
    })

    test.describe('Просмотр пользователей', async () => {
        test('Проверка, что блок пользователей виден', async ({usersPage}) => {
            await usersPage.checkUserBlockIsVisible()
        })

        test('Проверка, что имя, фамилия и почта каждого пользователя отображается', async ({usersPage}) => {
            await usersPage.checkDataUserBlock()
        })
    })

    test.describe('Редактирование информации о пользователях', async () => {
        test('Корректное отображение формы редактирования', async ({usersPage, userEditPage}) => {
            await usersPage.clickRow()
            await userEditPage.checkInputsValues('john@google.com', 'John', 'Doe')
            await userEditPage.checkRenderEditPage()
        })

        test('После редактирования данные успешно изменены', async ({usersPage, userEditPage}) => {
            await usersPage.clickRow()
            await userEditPage.editUserData(registrationData)
            await usersPage.checkUserDataAfterUpdate(registrationData)
        })

        // когда будет валидация, эти два теста будут падать, т.к. предполагается, что кнопка "Save" будет задизейблена, пока не значения в полях не будут валидные
        test('Проверка сохранения данных при невалидном значении поля "Email"', async ({usersPage, userEditPage}) => {
            await usersPage.clickRow()
            await userEditPage.changeEmailToInvalidValue(invalidEmail)
        })

        test('Проверка сохранения данных при пустых полях', async ({usersPage, userEditPage}) => {
            await usersPage.clickRow()
            await userEditPage.changeUserDataToEmpty()
        })
    })

    test.describe('Удаление пользователей', async () => {
        test('Удаление одного пользователя', async ({usersPage, userEditPage}) => {
            await usersPage.clickRow()
            await userEditPage.clickDeleteButton()
            await usersPage.checkAfterDeleteUserIsNotVisible('john@google.com')
        })

        test('Проверка, что выбраны все пользователя для удаления', async ({usersPage}) => {
            await usersPage.selectAllRowsViaCheckbox()
            await usersPage.checkCountSelectedItems()
        })

        test('Проверка, что все пользователи удалены', async ({usersPage}) => {
            await usersPage.selectAllRowsViaCheckbox()
            await usersPage.clickDeleteButton()
            await usersPage.checkNoItemYetBlockIsVisible('No User')
        })
    })
})