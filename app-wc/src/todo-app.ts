import {
    customElement,
    FASTElement,
    html,
    css,
    repeat,
    observable,
    ExecutionContext,
} from "@microsoft/fast-element";
import { TodoService } from './services/todo-service';
import { TodoItem } from "./todo-item";
import { inject } from '@microsoft/fast-foundation';
import { registerSW } from 'virtual:pwa-register';
function eventDetail<T = any>(ctx: ExecutionContext) {
    return (ctx.event as CustomEvent).detail as T;
}
const infoLink = "https://www.michaelburch.net/"
const githubLink = "https://github.com/michaelburch/todo"

const template = html<TodoApp>`
    
    <title-bar titleText="Todo"
      infoLink=${infoLink}
      githubLink=${githubLink}  
    >
    </title-bar>
    <div class="container">
    <div class="list">
    
    <todo-form @todo-submit=${(x, c) => x.addTodo(eventDetail(c))}></todo-form>
    <div class="spinner-border ${(x) => x.loading ? "" : "hide"}">
    </div>
    
        ${repeat(
            x => x.todos,
            html<TodoItem, TodoApp>`
            <todo-card>
            <div 
            class="label ${(x) => x.isComplete ? "complete" : ""}"
                @click=${(x, c) => c.parent.toggleComplete(x) }
            >${x => x.name}</div>
            
            <button 
                @click=${(x, c) => c.parent.removeTodo(x)}
                aria-label="Remove item"
            >
                &times;
            </button>
            </todo-card>
            `
        )}
    
    </div>
    </div>
`;

const styles = css`
    .container {
        height: 100%;
        width: 100%;
        background-color: var(--bg-color);
        overflow-y: auto; 
    }
    .list {
        align-items: center;
        margin: auto;
        width: 90%;
        padding: 1em;
        row-gap: 2em;
        padding-bottom: 4em;
    }
  
    @keyframes spinner-border {
       to {
        transform: rotate(360deg); 
       } 
    }
      
    .spinner-border {
        margin: auto;
        width: 1rem;
        height: 1rem;
        vertical-align: text-bottom;
        border: 0.25em solid var(--font-color);
        border-right-color: transparent;
        border-radius: 50%;
        animation: spinner-border .75s linear infinite; 
    }
  
    .hide {
        display: none;
    }
`;

@customElement({
    name: "todo-app",
    template,
    styles,
})
export class TodoApp extends FASTElement {
    @inject(TodoService) declare todoService: TodoService;
    @observable declare todos: TodoItem[];
    @observable declare loading: boolean;
    connectedCallback() {
        super.connectedCallback();
        registerSW({ immediate: true });
        this.loadData();
      }
    async loadData() {
        this.loading = true;
        this.todos = await this.todoService.getTodos();
        console.log(this.todos)
        this.loading = false;
      }
    public addTodo(name: string) {
        // Add the new item and then refresh data
        this.todoService.createTodo(name).then(()=>this.loadData());
    }
    public toggleComplete(item: TodoItem) {
        this.todoService.toggleComplete(item);
    }
    public removeTodo(record: TodoItem) {
        const index = this.todos.indexOf(record);
        
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
        this.todoService.deleteTodo(record.id);
    }
}
