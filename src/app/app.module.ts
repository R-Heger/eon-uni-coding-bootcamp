import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {TodolistComponent} from "./component/todolist/todolist.component";
import {TodolistitemComponent} from "./component/todolistitem/todolistitem.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatTabsModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {TodoService} from "./service/todo.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        TodolistComponent,
        TodolistitemComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        TodoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
