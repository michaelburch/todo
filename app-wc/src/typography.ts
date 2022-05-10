import { css } from '@microsoft/fast-element';

export const typography = css`
  .list-text {
    font-size: var(--type-ramp-plus-2-font-size);
    line-height: var(--type-ramp-plus-2-line-height);
  }
  .button {
    width: 30px;
    margin:auto;
    padding: 10px;
  }
  .label {
    flex:1;
    text-align: center;
    margin-right: 5px;
 
  }
  .todo-item {
    display:flex;
    color: #ddd;
    background-color: #3c3b3b; 
    align-items: center;
    border: 0;
    margin-bottom: 0.5em;
  }
  input {
    font-size: 100%;
    border: 0;
    text-align: center;
    background: none;
    color: white;
    outline: none;
  }
`;