import {test as base} from '@playwright/test'
import {Application} from "./pageObjects/Application";

type TestFixtures = {
    app: Application
}

const test = base.extend<TestFixtures>({
    app: async({ context}, use) => {
        const newPage = context.newPage()
        const app = new Application(await newPage)

        await app.loginPage.open()
        await app.loginPage.auth()

        await use(app)
    }
})

export { test }
