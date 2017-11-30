import {Component} from "@angular/core";
import {ITodoListItem} from "../todolistitem/todolistitem.type";
import {TodoService} from "../../service/todo.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Component({
    selector: "app-todolist",
    styleUrls: ["./todolist.scss"],
    templateUrl: "./todolist.html"
})
export class TodolistComponent {
    public todoItemList$: Observable<ITodoListItem[]>;

    constructor(
        private todoService: TodoService
    ) {
        this.todoItemList$ = this.todoService.getTodoListObservable();
    }

    public onTodoListItemChange($event: ITodoListItem): void {
        this.todoService.update($event).subscribe(() => console.log("refreshed after change"));
    }

}
