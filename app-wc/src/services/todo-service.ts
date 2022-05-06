import { observable } from "@microsoft/fast-element";
import { Http } from "./http";
import { TodoItem } from "../todo-item";
import { Cookie } from "./cookie";
import { DI } from '@microsoft/fast-foundation';
const baseUrl: string = 'https://api.todo.trailworks.io/api/'


export interface TodoService {
  createTodo(name: string)
  toggleComplete(todo: TodoItem)
  getTodos(): TodoItem[] 
  deleteTodo(id: string)
}

export class TodoServiceImpl {
  private cache: TodoItem[] | null = null;

  constructor(@Http private http: Http, @Cookie private cookie: Cookie) {}
  private uniqueId = this.cookie.getUniqueId();
  public async createTodo(name: string) {
    let todo: TodoItem = { 
      id: '',
      tenantId: this.uniqueId,
      name: name,
      isComplete: false
    };

    const response = await this.http.post<TodoItem>(`${baseUrl}${this.uniqueId}/todos`, todo)
    this.cache = null;
    console.log(response);
  }
  public async getTodos() {
    if (this.cache !== null) {
      return this.cache;
    }
    const response = await this.http.get<TodoItem[]>(`${baseUrl}${this.uniqueId}/todos`);
    
    return this.cache = response;
  }
  public async deleteTodo(id: string) {
    const response = await this.http.delete(`${baseUrl}${this.uniqueId}/todos/${id}`)
    console.log(response);
  }
  public async toggleComplete(todo: TodoItem) {
    todo.toggleComplete!();
    const response = await this.http.put<TodoItem>(`${baseUrl}${this.uniqueId}/todos/${todo.id}`, todo)
    console.log(response);
  }

}
export const TodoService = DI.createInterface<TodoService>(
  x => x.singleton(TodoServiceImpl)
);