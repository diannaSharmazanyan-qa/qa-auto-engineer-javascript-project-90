import {PageHolder} from "./base/PageHolder";
import {Page} from "@playwright/test";
import {LoginPage} from "./LoginPage";
import {UsersPage} from "./UsersPage";
import {CreateUserPage} from "./CreateUserPage";
import {UserEditPage} from "./UserEditPage";
import {TasksStatusesPage} from "./TasksStatusesPage";
import {TaskStatusEditPage} from "./TaskStatusEditPage";
import {CreateTaskStatusPage} from "./CreateTaskStatusPage";
import {LabelsPage} from "./LabelsPage";
import {CreateLabelPage} from "./CreateLabelPage";
import {LabelEditPage} from "./LabelEditPage";
import {TasksPage} from "./TasksPage";
import {TaskEditPage} from "./TaskEditPage";
import {CreateTaskPage} from "./CreateTaskPage";
import {MainPage} from "./MainPage";

export class Application extends PageHolder{
    mainPage: MainPage
    loginPage: LoginPage;
    usersPage: UsersPage
    createUserPage: CreateUserPage
    userEditPage: UserEditPage
    tasksStatusesPage: TasksStatusesPage
    taskStatusEditPage: TaskStatusEditPage
    createTaskStatusPage: CreateTaskStatusPage
    labelsPage: LabelsPage
    createLabelPage: CreateLabelPage
    labelEditPage: LabelEditPage
    tasksPage: TasksPage
    taskEditPage: TaskEditPage
    createTaskPage: CreateTaskPage


    constructor(page: Page) {
        super(page);
        this.loginPage = new LoginPage(this.page)
        this.usersPage = new UsersPage(this.page)
        this.createUserPage = new CreateUserPage(this.page)
        this.userEditPage = new UserEditPage(this.page)
        this.tasksStatusesPage = new TasksStatusesPage(this.page)
        this.taskStatusEditPage = new TaskStatusEditPage(this.page)
        this.createTaskStatusPage = new CreateTaskStatusPage(this.page)
        this.labelsPage = new LabelsPage(this.page)
        this.createLabelPage = new CreateLabelPage(this.page)
        this.labelEditPage = new LabelEditPage(this.page)
        this.tasksPage = new TasksPage(this.page)
        this.taskEditPage = new TaskEditPage(this.page)
        this.createTaskPage = new CreateTaskPage(this.page)
        this.mainPage = new MainPage(this.page)
    }
}