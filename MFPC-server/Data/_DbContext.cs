using Microsoft.EntityFrameworkCore;

namespace MFPC_server.Data
{
    public class _DbContext : DbContext
    {
        public  _DbContext(DbContextOptions<_DbContext> options) : base(options) { }

        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
