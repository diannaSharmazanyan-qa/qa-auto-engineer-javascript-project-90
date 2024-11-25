import {test} from "../base.fixture";

test.describe('Базовые проверки', () => {
  test.beforeEach(async ({loginPage}) => {
    await loginPage.open()
  })

  test('Рендер формы авторизации', async ({loginPage}) => {
    await loginPage.checkIsVisibleAuthForm()
  })

  test('Авторизация', async ({loginPage}) => {
    await loginPage.auth()
    await loginPage.checkHeaderIsVisible()
  })

  test('Выход из лк', async ({loginPage}) => {
    await loginPage.auth()
    await loginPage.logout()
    await loginPage.checkIsVisibleAuthForm()
  })
})