import { css } from '@microsoft/fast-element';

export const typography = css`
  h1, h2, h3, h4, h5, h6 {
    margin: 0px;
  }
  
  h1 {
    font-size: var(--type-ramp-plus-5-font-size);
    line-height: var(--type-ramp-plus-5-line-height);
  }

  h4 {
    font-size: var(--type-ramp-plus-2-font-size);
    line-height: var(--type-ramp-plus-2-line-height);
  }

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
    margin-left: 2.8em;
    padding: 0;
    margin-top:0;
    margin-bottom:0;
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
    margin-bottom: 0.5em;
  }
`;