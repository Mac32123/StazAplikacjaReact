using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StazAplikacjaReact.Server.Data;

namespace StazAplikacjaReact.Server.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
        private readonly AppDbContext _appDbContext; 
        public CategoryController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
			return Ok(await _appDbContext.Categories.AsNoTracking().ToListAsync());
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetCategory(int id)
		{
			var Cat = await _appDbContext.Categories.FindAsync(id);
			if (Cat is null)
			{
				return NotFound();
			}
			else
				return Ok(Cat);
		}
	}
}
