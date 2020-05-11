# todo App
---

This is a simple todo list application based on the default svelte application template.

### Model
The app uses a very minimal todo item with just three properties:

```javascript
{
    id: int,
    name: string,
    isCompleted: bool
}
```

Clicking on a todo item will mark it complete and cross it off of the list. Items can be removed by clicking on the delete button, and added using the input form at the top of the page.

### API Requirements
A REST API is required, and can also be found in this repo. The following methods are used:

| Method   | Endpoint |  Description  | 
|---|---|---|
| GET  | ${apiUrl}/todos/  | List all items  |
| PUT  | ${apiUrl}/todos/{id}  | Update an item  |
| POST  | ${apiUrl}/todos/{id}  |  Add an item  |
| DELETE   | ${apiUrl}/todos/{id}  |  Delete an item |

apiUrl defaults to "http://localhost:5003/api" and can be overridden by an environment variable set at build time 'API_URL'.

