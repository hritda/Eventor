using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;

namespace Eventor.Dtos
{
    public class UserResponseDto:BaseDto
    {
        public User userData {get;set;}
    }
}