using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace Eventor.Models
{
    public class User
    {
       public List<UserType>? UserTypes { get; set;}=new List<UserType>();
       public int Id { get; set; }
       [Required(AllowEmptyStrings = false,ErrorMessage = "Title is required.")]
       [MinLength(5, ErrorMessage ="minimum length 5 is required")]
       public string? FirstName { get; set; }
       public string LastName { get; set; }
       public string Password {get;set;}
       public string Email {get; set;}
       
// firstbame
// lastname
// age
// email
// mobile
// password 
// usertypeId
    }
}