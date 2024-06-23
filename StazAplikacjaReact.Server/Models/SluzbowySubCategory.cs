using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    //podkategorie dla kategorii "Służbowy"
    public class SluzbowySubCategory
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
