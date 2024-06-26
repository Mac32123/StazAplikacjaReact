using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace WebApplication1.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "To pole jest wymagane")]
        [StringLength(50, ErrorMessage ="Imie musi zawierać poniżej 50 znaków")]
        [DisplayName("Imie")]
        public string Name { get; set; }
        [Required(ErrorMessage = "To pole jest wymagane")]
        [StringLength(50, ErrorMessage = "Nazwisko musi zawierać poniżej 50 znaków")]
        [DisplayName("Nazwisko")]
        public string Surname { get; set; }
        [Required(ErrorMessage = "To pole jest wymagane")]
        [RegularExpression("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", ErrorMessage = "Nieprawidłowy email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "To pole jest wymagane")]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Hasło musi składać się z przynajmniej 8 znaków, zawierać przynajmniej jedną dużą i małą literę oraz znak specjalny")]
        [DisplayName("Hasło")]
        public string Password { get; set; }    //skoro i tak każdy zalogowany użytkownik może podejrzeć hasło każdego kontaktu to można je przechowywać jako plaintext
        [Required]
        public int CategoryId { get; set; }
        [AllowNull]
        public Category? Category { get; set; }
        [AllowNull]
        public int? SluzbowySubCategoryId { get; set; }
        [AllowNull]
        public SluzbowySubCategory? SluzbowySubCategory { get; set; }
        [AllowNull]
        public string? OtherCategory { get; set; }
        [Required(ErrorMessage = "To pole jest wymagane")]
        [RegularExpression("(\\+[0-9]{2})?[0-9]{9}", ErrorMessage ="Niepoprawny numer telefonu")]
        [DisplayName("Numer telefonu")]

        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "To pole jest wymagane")]
        //[RegularExpression("(0?[1-9]|1[012])\\.(0?[1-9]|[12][0-9]|3[01])\\.((19|20)\\d\\d)", ErrorMessage = "Nieprawidłowa data urodzenia. Data musi mieć format DD.MM.YYYY")]
        [DisplayName("Data Urodzenia")]
        public DateTime BirthDate { get; set; }
    }
}
