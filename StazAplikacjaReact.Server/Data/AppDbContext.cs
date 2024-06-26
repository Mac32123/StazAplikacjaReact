using Microsoft.EntityFrameworkCore;
using StazAplikacjaReact.Server.Models;
using WebApplication1.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace StazAplikacjaReact.Server.Data
{
	public class AppDbContext : IdentityDbContext<ApplicationUser>
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}

		public DbSet<Contact> Contacts { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<SluzbowySubCategory> SluzbowySubCategories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

			modelBuilder.Entity<Category>().HasData(
				new Category { Id = 1, Name = "Służbowy" },
				new Category { Id = 2, Name = "Prywatny" },
				new Category { Id = 3, Name = "Inny" }
				);
			modelBuilder.Entity<SluzbowySubCategory>().HasData(
				new SluzbowySubCategory { Id = 1, Name = "Szef" },
				new SluzbowySubCategory { Id = 2, Name = "Klient" },
				new SluzbowySubCategory { Id = 3, Name = "Współpracownik" },
				new SluzbowySubCategory { Id = 4, Name = "Inny" }
				);
			modelBuilder.Entity<Contact>().HasData(
				new Contact { Id = 1, Name = "Maciej", Surname = "Lica", Email = "s189033@student.pg.edu.pl", PhoneNumber = "662066180", BirthDate = DateTime.Parse("12/06/2003"), CategoryId = 2, Password = "SeCrEt1*!"},
				new Contact { Id = 2, Name = "Lorem", Surname = "Ipsum", Email = "loremipsum@example.com", PhoneNumber = "000000000", BirthDate = DateTime.Parse("06/03/0045"), CategoryId=2, Password = "SeCrEt2*!"}
				);
			base.OnModelCreating(modelBuilder);
		}
	}
}
