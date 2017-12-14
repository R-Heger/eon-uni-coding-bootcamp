import {Injectable} from "@angular/core";
import {ITodoListItem} from "../component/todolistitem/todolistitem.type";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as v4 from "uuid/v4";
import "rxjs/add/operator/first";
import "rxjs/add/operator/do";



@Injectable()
export class TodoService {

    private todoListSubject: BehaviorSubject<ITodoListItem[]>;

    constructor(
        private httpClient: HttpClient
    ) {
        this.todoListSubject = new BehaviorSubject([]);
        this.fetch();
    }

    public fetch(): void {
        this.httpClient.get<ITodoListItem[]>("http://localhost:3004/todos").first()
            .subscribe((res) => {
                this.todoListSubject.next(res);
            }, (error) => {
                console.log("httpClient.get for todos caused error", error);
            });
    }

    public postNewItem(todoText: string): void {
        const newItem: ITodoListItem = {
            id: v4(),
            isDone: false,
            text: todoText
        };
        this.httpClient.post<ITodoListItem>("http://localhost:3004/todos/", newItem).first().subscribe(
            () => this.fetch()
        );
    }

    public getTodoListObservable(): Observable<ITodoListItem[]> {
        return this.todoListSubject.asObservable();
    }

    public update(todoListItem: ITodoListItem): Observable<ITodoListItem> {
        return this.httpClient.put<ITodoListItem>(`http://localhost:3004/todos/${todoListItem.id}`, todoListItem)
            .first()
            .do(() => this.fetch());
    }

    public remove(id: string): Observable<any> {
        return this.httpClient.delete(`http://localhost:3004/todos/${id}`);
    }
}
