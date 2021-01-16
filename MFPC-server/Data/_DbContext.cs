using Microsoft.EntityFrameworkCore;

namespace MFPC_server.Data
{
    public class _DbContext : DbContext
    {
        public _DbContext(DbContextOptions<_DbContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<JobTitle> JobTitle { get; set; }
        public DbSet<JobTitleRole> JobTitleRole { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}