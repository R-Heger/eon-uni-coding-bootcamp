import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ITodoListItem} from "./todolistitem.type";
import {MatCheckboxChange} from "@angular/material";

@Component({
    selector: "app-todolistitem",
    styleUrls: ["todolistitem.scss"],
    templateUrl: "todolistitem.html"
})
export class TodolistitemComponent {
    @Input()
    public todoListItem: ITodoListItem;

    @Output()
    public isDoneChange: EventEmitter<ITodoListItem>;

    constructor() {
        this.isDoneChange = new EventEmitter();
    }

    public onCheckToggle($event: MatCheckboxChange): void {
        this.isDoneChange.emit(this.todoListItem);
    }
}
