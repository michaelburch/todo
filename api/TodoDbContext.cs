﻿using Microsoft.EntityFrameworkCore;

namespace todo
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
            // Peform EF migrations if not using in-memory db
            if (!this.Database.IsInMemory())
            {
                this.Database.Migrate();
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {   
            // Use SQL Server if connection string is provided in environment
            var dbCstr = System.Environment.GetEnvironmentVariable("DB_CSTR") ?? string.Empty;
            
            if (string.IsNullOrEmpty(dbCstr))
            {
                optionsBuilder.UseInMemoryDatabase("Todos");
            }
            else
            {
                optionsBuilder.UseSqlServer(dbCstr);
            }
            
        }
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
