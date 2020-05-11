using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace todo
{
    /// <summary>
    /// This class is a design time factory for use with EF tools
    /// </summary>
    public class TodoDbContextFactory : IDesignTimeDbContextFactory<TodoDbContext>
    {
        public TodoDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TodoDbContext>();
            var dbCstr = System.Environment.GetEnvironmentVariable("DB_CSTR") ?? string.Empty;

            optionsBuilder.UseSqlServer(dbCstr);

            return new TodoDbContext(optionsBuilder.Options);
        }
    }
}