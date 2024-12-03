import {Page} from "@playwright/test";

export abstract class PageHolder {
    protected page: Page

    protected constructor(page: Page) {
        this.page = page;
    }
}