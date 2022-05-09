import {
    customElement,
    FASTElement,
    html,
    css,
    attr,
    repeat,
    observable,
    ExecutionContext,
} from "@microsoft/fast-element";
import { TodoService } from './services/todo-service';
import { TodoItem } from "./todo-item";
import { typography } from "./typography";
import { inject } from '@microsoft/fast-foundation';

import { fillColor, neutralForegroundRest } from "@fluentui/web-components";

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
            <fluent-card class="todo-item">
                    <div
                    class="${(x) => x.isComplete ? "label complete" : "label"}"
                        @click=${(x, c) => c.parent.toggleComplete(x) }
                    >${x => x.name}</div>
                    <div class="button">
                    <fluent-button appearance="accent"
                        @click=${(x, c) => c.parent.removeTodo(x)}
                        aria-label="Remove item"
                    >
                        &times;
                    </fluent-button>
                    </div>
                </fluent-card>
            `
        )}
    
    </div>
    </div>
`;

const styles = css`
    ${typography} :host {      
        font-size:16px;
        color: ${neutralForegroundRest};
    }
    .container {
        height: 100%;
        width: 100%;
        background-color: #646464;
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
    .todo-item {
        display:flex;
        width: 100%;
        color: #ddd;
        background-color: #3c3b3b; 
        align-items: center;
        padding: 0px;
        border: 0;
        height: 100%;
        margin-bottom: .5em;
      }
      .button {
        width: 30px;
        margin:auto;
        padding: 10px;
      }
      .label {
        flex:1;
        text-align: center;
        margin-left: 2.8em;
        padding: 18px;
        margin-top:0;
        margin-bottom:0;
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
        border: 0.25em solid #ddd;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spinner-border .75s linear infinite; 
    }


    .complete {
        text-decoration: line-through;
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
    @inject(TodoService) todoService!: TodoService;
    @observable todos: TodoItem[] = [];
    @observable loading: boolean = false;
    connectedCallback() {
        super.connectedCallback();
        this.loadData();
      }
    async loadData() {
        this.loading = true;
        this.todos = await this.todoService.getTodos();
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
