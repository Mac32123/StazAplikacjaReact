using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StazAplikacjaReact.Server.Data;
using WebApplication1.Models;

namespace StazAplikacjaReact.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ContactsController : ControllerBase
	{
		private readonly AppDbContext _appDbContext;

		public ContactsController(AppDbContext appDbContext)
		{
			_appDbContext = appDbContext;
		}
		[HttpGet]
		public async Task<IActionResult> Contacts()
		{
			return Ok(await _appDbContext.Contacts.AsNoTracking().ToListAsync());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetContact(int id)
		{
			var contact = await _appDbContext.Contacts.FindAsync(id);

			if (contact is null)
			{
				return NotFound();
			}
			return Ok(contact);
		}

		[HttpPost]
		public async Task<IActionResult> CreateContact(Contact contact)
		{
			if (contact is null)
			{
				return BadRequest();
			}
			else if (ModelState.IsValid)
			{
				await _appDbContext.Contacts.AddAsync(contact);
				await _appDbContext.SaveChangesAsync();

				return Ok(contact);
			}
			return BadRequest();
		}
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateContact(int id, Contact contact)
		{
			if (id != contact.Id)
			{
				return BadRequest();
			}

			_appDbContext.Entry(contact).State = EntityState.Modified;
			await _appDbContext.SaveChangesAsync();
			return NoContent();
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteContact(int id)
		{
			var contact = _appDbContext.Contacts.Find(id);
			
			if(contact is null)
			{
			return NotFound(); 
			}

			_appDbContext.Contacts.Remove(contact);
			await _appDbContext.SaveChangesAsync();
			return Ok(contact);
		}
	}
}
