using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Models
{
    public class User
    {
       public List<UserType>? UserTypes { get; set; }=new List<UserType>();
       public int Id { get; set; }
       public string? FirstName { get; set; }
       public string LastName { get; set; }
       
// firstbame
// lastname
// age
// email
// mobile
// password 
// usertypeId
    }
}