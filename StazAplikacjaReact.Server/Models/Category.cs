using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    //klasa mapowana na tabelę bazodanową zawierającą kategorie: służbowy, prywatny, inny
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
