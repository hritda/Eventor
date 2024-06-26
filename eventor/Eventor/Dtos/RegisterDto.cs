using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Eventor.Dtos
{
    public class RegisterDto
    {
         public List<string>? UserTypeCodes { get; set;}=[];
       public int Id { get; set; }
       [Required(AllowEmptyStrings = false,ErrorMessage = "Title is required.")]
       [MinLength(5, ErrorMessage ="minimum length 5 is required")]
       public string? FirstName { get; set; }
       public string LastName { get; set; }
       public string Password {get;set;}
       public string Email {get; set;}
    }
}