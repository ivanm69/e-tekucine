

using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class TekucineContext : DbContext
    {
        public TekucineContext(DbContextOptions<TekucineContext> options)
            : base(options)
        {

        }

        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Proizvodjac> Proizvodjaci { get; set; }

        public DbSet<Aroma>Arome { get; set; }

    }
}