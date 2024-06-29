using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Dtos
{
    public class LoginDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "email is required.")]
        [MinLength(8, ErrorMessage = "minimum length 8 is required")]
        [EmailAddress(ErrorMessage = "not a valid email")]
        public string? Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "password is required.")]
        [MinLength(8, ErrorMessage = "minimum length 8 is required")]

        public string? Password { get; set; }

        [Required]
        public int? UserType { get; set; } 
    }
}