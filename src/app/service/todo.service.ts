import {Injectable} from "@angular/core";
import {ITodoListItem} from "../component/todolistitem/todolistitem.type";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/first";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/do";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/filter";


@Injectable()
export class TodoService {

    private todoListSubject: BehaviorSubject<ITodoListItem[]>;

    constructor(
        private httpClient: HttpClient
    ) {
        this.todoListSubject = new BehaviorSubject([]);
        this.fetch();
    }

    private fetch(): void {
        this.httpClient.get<ITodoListItem[]>("http://localhost:3004/todos").first().subscribe((res) => {
            this.todoListSubject.next(res);
        });
    }

    public getTodoListObservable(): Observable<ITodoListItem[]> {
        return this.todoListSubject.asObservable();
    }

    public update(todoListItem: ITodoListItem): Observable<ITodoListItem> {
        return this.httpClient.put<ITodoListItem>(`http://localhost:3004/todos/${todoListItem.id}`, todoListItem)
            .first()
            .do(() => this.fetch());
    }
}
