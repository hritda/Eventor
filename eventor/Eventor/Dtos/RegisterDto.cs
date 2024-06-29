using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Eventor.Dtos
{
  public class RegisterDto
  {
    [Required]
    public List<string>? UserTypeCodes { get; set; } = [];
    [Required(AllowEmptyStrings = false, ErrorMessage = "first name is required.")]
    [MinLength(3, ErrorMessage = "minimum length 3 is required")]
    public string? FirstName { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "last name is required.")]
    [MinLength(3, ErrorMessage = "minimum length 3 is required")]
    public string? LastName { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "password is required.")]
    [MinLength(8, ErrorMessage = "minimum length 8 is required")]
    public string? Password { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "email is required.")]
    [MinLength(3, ErrorMessage = "minimum length 3 is required")]
    [EmailAddress]
    public string? Email { get; set; }
  }
}