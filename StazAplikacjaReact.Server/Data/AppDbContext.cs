using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace StazAplikacjaReact.Server.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}

		public DbSet<Contact> Contacts { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<SluzbowySubCategory> SluzbowySubCategories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			Category privCat = new Category { Id = 2, Name = "Prywatny" };  //obiekt stworzony na zewnątrz, żeby mógł być użyty w dwóch różnych addach
			modelBuilder.Entity<Category>().HasData(
				new Category { Id = 1, Name = "Służbowy" },
				privCat,
				new Category { Id = 3, Name = "Inny" }
				);
			modelBuilder.Entity<SluzbowySubCategory>().HasData(
				new SluzbowySubCategory { Id = 1, Name = "Szef" },
				new SluzbowySubCategory { Id = 2, Name = "Klient" },
				new SluzbowySubCategory { Id = 3, Name = "Współpracownik" },
				new SluzbowySubCategory { Id = 4, Name = "Inny" }
				);
			modelBuilder.Entity<Contact>().HasData(
				new Contact { Id = 1, Name = "Maciej", Surname = "Lica", Email = "s189033@student.pg.edu.pl", PhoneNumber = "662066180", BirthDate = "12.06.2003", Password = "SeCrEt*!", otherCategory = "" },
				new Contact { Id = 2, Name = "Lorem", Surname = "Ipsum", Email = "loremipsum@example.com", PhoneNumber = "000000000", BirthDate = "06.03.45 p.n.e.", Password = "SeCrEt2*!", otherCategory = "" }
				);


		}
	}
}
