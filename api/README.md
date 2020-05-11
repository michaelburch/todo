# todo App
---

This is a simple todo list API written in C#, based on [@davidfowl's todo examples](https://github.com/davidfowl/Todos/tree/master/TodoWithDI).

### Model
The API defines a very minimal todo item with just three properties:

```javascript
{
    id: int,
    name: string,
    isCompleted: bool
}
```

### Entity Framework backend
An in-memory database will be used by default, but can be replaced with a SQL Server backend by providing a connection string in an environment variable named "DB_CSTR". 

```bash
DB_CSTR="Server=mysqlserver;Database=todo;User Id=sa;Password=<my_sa_password>;"
```
