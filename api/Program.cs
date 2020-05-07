using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace todo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            
            
            var builder = WebApplication.CreateBuilder(args);
            
            builder.Services.AddDbContext<TodoDbContext>();
            
            var app = builder.Build();
            
            var todos = new TodoApi();
            todos.MapRoutes(app);

            await app.RunAsync();
        }
    }
}
