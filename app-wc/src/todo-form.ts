import {
    FASTElement,
    html,
    observable,
    customElement,
    css,
} from "@microsoft/fast-element";
import type { TextField } from "@fluentui/web-components";
import { typography } from "./typography";

const template = html<TodoForm>`
    <form @submit=${x => x.submitTodo()}>
    <fluent-card class="todo-item">
       <div class="label"> 
       <input class="input"
        :value=${x => x.name}
        placeholder="Add a Todo"
        @input=${(x, c) => x.onDescriptionInput(c.event)}
        ></input>
        </div>
        <div class="button">
        <fluent-button
            type="submit"
            appearance="accent"
            ?disabled=${x => !x.canSubmitTodo}
        > +
        </fluent-button>
        </div>
    </fluent-card>
    </form>
`;

const styles = css`
    ${typography}
    form {
        margin-bottom: .5em;
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
      }
      .label {
        flex:1;
        text-align: center;
        margin-left: auto;
        margin-right: 15px;
      }
 
      .input {
        height: 100%;
        width: 100%;
        font-size: 100%;
        border: 0;
        text-align: center;
        background: none;
        color: white;
        outline: none;
        margin-left: 1.5em;
      }
`;

@customElement({
    name: "todo-form",
    template,
    styles,
})
export class TodoForm extends FASTElement {
    @observable public name: string = "";

    get canSubmitTodo() {
        return !!this.name;
    }

    public submitTodo() {
        if (this.canSubmitTodo) {
            this.$emit("todo-submit", this.name);
            console.log(this.name);
            this.name = "";
        }
    }

    public onDescriptionInput(event: Event) {
        this.name = (event.target! as TextField).value;
    }
}
