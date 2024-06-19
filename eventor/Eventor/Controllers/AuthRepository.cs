using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Controllers
{
    public class AuthRepository : IAuthRepository
    {
        public bool Login(string username, string password)
        {
           return true;
        }
    }
}