import { Http } from "./http";
import { Cookie } from "./cookie";
import { TodoItem } from "../todo-item";
import { DI } from '@microsoft/fast-foundation';
import { plainToInstance } from 'class-transformer';
const baseUrl: string = 'https://api.todo.trailworks.io/api/v1/'


export interface TodoService {
  createTodo(name: string) : Promise<void>
  toggleComplete(todo: TodoItem) : Promise<void>
  getTodos(): Promise<TodoItem[]> 
  deleteTodo(id: string) : Promise<void>
}

export class TodoServiceImpl implements TodoService{
  private cache: TodoItem[] | null = null;
  private uniqueId: string = "";
  constructor(@Http private http: Http, @Cookie private cookie: Cookie) {
    this.uniqueId = this.cookie.getUniqueId();
  }
  
  public async createTodo(name: string) {
    let todo = new TodoItem(name);
    const response = await this.http.post<TodoItem>(`${baseUrl}${this.uniqueId}/todos`, todo)
    this.cache = null;
    console.log(response);
  }
  public async getTodos() {
    if (this.cache !== null) {
      return this.cache;
    }
    const response = await this.http.get<TodoItem[]>(`${baseUrl}${this.uniqueId}/todos`);
    return this.cache = plainToInstance(TodoItem,response);
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