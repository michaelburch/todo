﻿﻿using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace todo
{
    public class TodoApi
    {
        private readonly JsonSerializerOptions _options = new JsonSerializerOptions
        {
             PropertyNameCaseInsensitive = true,
             PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public async Task GetAllAsync(TodoDbContext db, HttpContext context)
        {
            var todos = await db.TodoItems.ToListAsync();

            await context.Response.WriteJsonAsync(todos, _options);
        }

        public async Task GetAsync(TodoDbContext db, HttpContext context)
        {
            if (!context.Request.RouteValues.TryGet("id", out int id))
            {
                context.Response.StatusCode = 400;
                return;
            }

            var todo = await db.TodoItems.FindAsync(id);
            if (todo == null)
            {
                context.Response.StatusCode = 404;
                return;
            }

            await context.Response.WriteJsonAsync(todo, _options);
        }

        public async Task PostAsync(TodoDbContext db, HttpContext context)
        {
            var todo = await context.Request.ReadJsonAsync<TodoItem>(_options);

            if (await db.TodoItems.ContainsAsync(todo))
            {
                db.TodoItems.Update(todo);
            }
            else
            {
                await db.TodoItems.AddAsync(todo);
            }
            
            await db.SaveChangesAsync();
        }

        public async Task PutAsync(TodoDbContext db, HttpContext context)
        {
            if (!context.Request.RouteValues.TryGet("id", out int id))
            {
                context.Response.StatusCode = 400;
                return;
            }
            
            var todo = await context.Request.ReadJsonAsync<TodoItem>(_options);
            todo.Id = id;

            db.TodoItems.Update(todo);
                        
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(TodoDbContext db, HttpContext context)
        {
            if (!context.Request.RouteValues.TryGet("id", out int id))
            {
                context.Response.StatusCode = 400;
                return;
            }

            var todo = await db.TodoItems.FindAsync(id);
            if (todo == null)
            {
                context.Response.StatusCode = 404;
                return;
            }

            db.TodoItems.Remove(todo);
            await db.SaveChangesAsync();
        }

        public void MapRoutes(IEndpointRouteBuilder endpoints)
        {
            endpoints.MapGet("/api/todos", WithDbContext(GetAllAsync));
            endpoints.MapGet("/api/todos/{id}", WithDbContext(GetAsync));
            endpoints.MapPut("/api/todos/{id}", WithDbContext(PutAsync));
            endpoints.MapPost("/api/todos", WithDbContext(PostAsync));
            endpoints.MapDelete("/api/todos/{id}", WithDbContext(DeleteAsync));
        }

        private RequestDelegate WithDbContext(Func<TodoDbContext, HttpContext, Task> handler)
        {
            return context =>
            {
                // Resolve the service from the container
                var db = context.RequestServices.GetRequiredService<TodoDbContext>();
                return handler(db, context);
            };
        }

    }
}
