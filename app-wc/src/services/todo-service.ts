import { Http } from "./http";
import { TodoItem } from "../todo-item";
import { DI } from '@microsoft/fast-foundation';
import { plainToInstance } from 'class-transformer';
const baseUrl: string = 'https://api.todo.trailworks.io/v1'


export interface TodoService {
  createTodo(name: string) : Promise<void>
  toggleComplete(todo: TodoItem) : Promise<void>
  getTodos(): Promise<TodoItem[]> 
  deleteTodo(id: string) : Promise<void>
}

export class TodoServiceImpl implements TodoService{
  private cache: TodoItem[] | null = null;
  constructor(@Http private http: Http) { http.setCredentialMode("include") }
  
  public async createTodo(name: string) {
    let todo = new TodoItem(name);
    const response = await this.http.post<TodoItem>(`${baseUrl}/todos`, todo)
    this.cache = null;
    console.log(response);
  }
  public async getTodos() {
    if (this.cache !== null) {
      return this.cache;
    }
    const response = await this.http.get<TodoItem[]>(`${baseUrl}/todos`);
    return this.cache = plainToInstance(TodoItem,response);
  }
  public async deleteTodo(id: string) {
    const response = await this.http.delete(`${baseUrl}/todos/${id}`)
    console.log(response);
  }
  public async toggleComplete(todo: TodoItem) {
    todo.toggleComplete!();
    const response = await this.http.put<TodoItem>(`${baseUrl}/todos/${todo.id}`, todo)
    console.log(response);
  }

}
export const TodoService = DI.createInterface<TodoService>(
  x => x.singleton(TodoServiceImpl)
);