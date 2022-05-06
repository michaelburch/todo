import {
    TextField,
    textFieldTemplate as template,
} from "@microsoft/fast-foundation";

let styles = `{{ :root { background: none}}}` 
export const todoTextField = TextField.compose({
    baseName: "todo-text-field",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
});