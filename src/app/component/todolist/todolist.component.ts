import {Component} from "@angular/core";
import {ITodoListItem} from "../todolistitem/todolistitem.type";
import {TodoService} from "../../service/todo.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/forkJoin";

@Component({
    selector: "app-todolist",
    styleUrls: ["./todolist.scss"],
    templateUrl: "./todolist.html"
})
export class TodolistComponent {
    public todoItemList$: Observable<ITodoListItem[]>;
    public doneTodoItemList$: Observable<ITodoListItem[]>;
    public undoneTodoItemList$: Observable<ITodoListItem[]>;
    public userinput: string;

    constructor(
        private todoService: TodoService
    ) {
        this.todoItemList$ = this.todoService.getTodoListObservable();
        this.doneTodoItemList$ = this.todoItemList$.map((items) => items.filter((entry) => entry.isDone));
        this.undoneTodoItemList$ = this.todoItemList$.map((items) => items.filter((entry) => !entry.isDone));
    }

    public onTodoListItemChange($event: ITodoListItem): void {
        this.todoService.update($event).subscribe();
    }

    public submitOnEnter($event: KeyboardEvent): void {
        if ($event.keyCode === 13) {
            this.submitNewItem();
        }
    }

    public submitNewItem(): void {
        this.todoService.postNewItem(this.userinput);
        this.userinput = "";
    }

    public deleteDoneItems(): void {
        this.doneTodoItemList$.subscribe((doneEntries) => {
            const deleteObs$ = [];

            for (const entry of doneEntries) {
                deleteObs$.push(this.todoService.remove(entry.id));
            }

            Observable.forkJoin(deleteObs$).subscribe(() => this.todoService.fetch());
        });
    }

}
