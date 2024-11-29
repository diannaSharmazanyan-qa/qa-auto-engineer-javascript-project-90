import {test} from "../base.fixture";

test.describe('Базовые проверки', () => {
  test('Проверка заголовка после успешной авторизации', async ({app: {loginPage, mainPage}}) => {
    await mainPage.checkHeaderIsVisible()
  })

  test('Проверка видимости формы авторизации после выхода из лк', async ({app: {loginPage, mainPage}}) => {
    await mainPage.logout()
    await loginPage.checkIsVisibleAuthForm()
  })
})