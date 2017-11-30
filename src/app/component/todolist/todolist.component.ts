import {Component} from "@angular/core";
import {ITodoListItem} from "../todolistitem/todolistitem.type";

@Component({
    selector: "app-todolist",
    styleUrls: ["./todolist.scss"],
    templateUrl: "./todolist.html"
})
export class TodolistComponent {
    public todoItemList: ITodoListItem[];

    constructor() {
        this.todoItemList = [
            {
                id: "null",
                isDone: false,
                text: "voll der tolle Text"
            },
            {
                id: "eins",
                isDone: true,
                text: "noch tollerer Text"
            },
            {
                id: "zwei",
                isDone: false,
                text: "fantanstomatischer Text"
            }
        ];
    }
}
