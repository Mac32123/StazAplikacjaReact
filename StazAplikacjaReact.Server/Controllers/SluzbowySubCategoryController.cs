using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StazAplikacjaReact.Server.Data;

namespace StazAplikacjaReact.Server.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class SluzbowySubCategoryController : ControllerBase
	{
		private readonly AppDbContext _appDbContext;
		public SluzbowySubCategoryController(AppDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}
		[HttpGet]
		public async Task<IActionResult> GetSubCategories()
		{
			return Ok(await _appDbContext.SluzbowySubCategories.AsNoTracking().ToListAsync());
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSubCategory(int id)
		{
			var subCat = await _appDbContext.SluzbowySubCategories.FindAsync(id);
			if(subCat is null) 
			{
				return NotFound();
			}
			else
			return Ok(subCat);
		}
	}
}