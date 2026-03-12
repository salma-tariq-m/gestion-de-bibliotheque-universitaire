using System.ComponentModel.DataAnnotations;

namespace LibraryApi.DTOs
{
    public class BookDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(100)]
        public string Author { get; set; }
    }
}