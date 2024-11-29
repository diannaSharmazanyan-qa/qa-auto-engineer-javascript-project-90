import {test} from "../base.fixture";
import {registrationData} from "../data/registrationData";

const invalidEmail = '123'


test.describe("Пользователи", async () => {
    test.beforeEach(async ({app: { mainPage}}) => {
        await mainPage.clickTab('Users')
    })

    test.describe('Создание пользователей', async () => {
        test('Проверка, что пользователь создался и данные сохранились корректно', async ({app: {createUserPage, usersPage, mainPage}}) => {
            await usersPage.clickCreateButton()
            await createUserPage.createUser(registrationData)
            await mainPage.clickTab('Users')
            await usersPage.checkUserDataAfterCreate(registrationData)
        })

        test('Корректное отображение формы создания пользователя', async ({app: {createUserPage, usersPage}}) => {
            await usersPage.clickCreateButton()
            await createUserPage.checkRenderCreatePage()
        })
    })

    test.describe('Просмотр пользователей', async () => {
        test('Проверка, что блок пользователей виден', async ({app: {usersPage}}) => {
            await usersPage.checkUserBlockIsVisible()
        })

        test('Проверка, что имя, фамилия и почта каждого пользователя отображается', async ({app: {usersPage}}) => {
            await usersPage.checkDataUserBlock()
        })
    })

    test.describe('Редактирование информации о пользователях', async () => {
        test('Корректное отображение формы редактирования', async ({app: {usersPage, userEditPage}}) => {
            await usersPage.clickRow()
            await userEditPage.checkInputsValues('john@google.com', 'John', 'Doe')
            await userEditPage.checkRenderEditPage()
        })

        test('После редактирования данные успешно изменены', async ({app: {usersPage, userEditPage}}) => {
            await usersPage.clickRow()
            await userEditPage.editUserData(registrationData)
            await usersPage.checkUserDataAfterUpdate(registrationData)
        })

        // Когда будет валидация, эти два теста будут падать, т.к. предполагается, что кнопка "Save" будет задизейблена, пока не значения в полях не будут валидные
        test('Проверка сохранения данных при невалидном значении поля "Email"', async ({app: {usersPage, userEditPage}}) => {
            await usersPage.clickRow()
            await userEditPage.changeEmailToInvalidValue(invalidEmail)
        })

        test('Проверка сохранения данных при пустых полях', async ({app: {usersPage, userEditPage}}) => {
            await usersPage.clickRow()
            await userEditPage.changeUserDataToEmpty()
        })
    })

    test.describe('Удаление пользователей', async () => {
        test('Удаление одного пользователя', async ({app: {usersPage, userEditPage}}) => {
            await usersPage.clickRow()
            await userEditPage.clickDeleteButton()
            await usersPage.checkAfterDeleteUserIsNotVisible('john@google.com')
        })

        test('Проверка, что выбраны все пользователя для удаления', async ({app: {usersPage}}) => {
            await usersPage.selectAllRowsViaCheckbox()
            await usersPage.checkCountSelectedItems()
        })

        test('Проверка, что все пользователи удалены', async ({app: {usersPage}}) => {
            await usersPage.selectAllRowsViaCheckbox()
            await usersPage.clickDeleteButton()
            await usersPage.checkNoItemYetBlockIsVisible('No User')
        })
    })
})