import {
    FASTElement,
    html,
    observable,
    customElement,
    css,
} from "@microsoft/fast-element";
import { TextField } from "@microsoft/fast-foundation";

const template = html<TodoForm>`
    <form @submit=${x => x.submitTodo()}>
    <todo-card>
       <div class="label"> 
       <input 
        :value=${x => x.name}
        placeholder="Add a Todo"
        @input=${(x, c) => x.onDescriptionInput(c.event)}
        ></input>
        </div>
        <button
        type="submit"
            ?disabled=${x => !x.canSubmitTodo}
        > +
        </button>
    </todo-card>
    </form>
`;

const styles = css`
    input {
        font-size: 100%;
        font-family: var(--font-family);
        border: 0;
        text-align: center;
        background: none;
        color: var(--font-color);
        outline: none;
        width: 100%;
      }
`;

@customElement({
    name: "todo-form",
    template,
    styles,
})
export class TodoForm extends FASTElement {
    @observable declare public name: string;
    constructor() {
        super()
        this.name = "";
    }
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
