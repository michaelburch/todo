import { FASTElement, customElement, html, css} from '@microsoft/fast-element';

const template = html<TodoCard>`
<div class="todo-item">
 <slot></slot>
</div>
`;

const styles = css`
.todo-item {
  display:flex;
  border-radius: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 calc(4 * 0.5px) calc((4 * 1px)) rgba(0, 0, 0, 0.14);
  color: #ddd;
  background-color: #3c3b3b; 
  align-items: center;
  border: 0;
  margin-bottom: 0.5em;
  padding: 10px;
}
::slotted(.label) {
    flex:1;
    text-align: center;
    margin-right: 5px;
    margin-left: 32px;
}
::slotted(.complete) {
    text-decoration: line-through;
}
::slotted(button) {
  padding: 5px 11.11px;
  line-height: 20px;
  background: #3f75a2;
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #ddd;
  height: 100%;
}
::slotted(button:disabled),::slotted(button[disabled]) {
  opacity: 0.3;
}
`;

@customElement({
  name: 'todo-card',
  template,
  styles
})
export class TodoCard extends FASTElement {
  constructor() {
     super();
 }
}