using Microsoft.EntityFrameworkCore;

namespace MFPC_server.Data
{
    public class _DbContext : DbContext
    {
        public _DbContext(DbContextOptions<_DbContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<JobTitle> JobTitle { get; set; }
        public DbSet<JobTitleRole> JobTitleRole { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>().HasData(
                new Role() { Id = 1, Name = "Admin", Description = "Do everything"},
                new Role() { Id = 2, Name = "JobTitleManager", Description = "Can perform CRUD on Job Titles"},
                new Role() { Id = 3, Name = "PeopleManager", Description = "Can manage peoples"},
                new Role() { Id = 4, Name = "HR", Description = "Can assign job titles to members"}
                );
        }
    }
}