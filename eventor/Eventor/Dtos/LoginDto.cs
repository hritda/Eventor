using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Dtos
{
    public class LoginDto
    {
        public string? username { get; set; }
        public string? password{get;set;}
        public bool IsAutheticated { get; set; }
    }
}