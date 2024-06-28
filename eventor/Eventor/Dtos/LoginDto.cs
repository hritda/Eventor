using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Dtos
{
    public class LoginDto
    {
        public string? Email { get; set; }
        public string? Password{get;set;}

        public bool IsUserPresent{get; set;}
        public bool IsPasswordCorrect { get; set; }
    }
}