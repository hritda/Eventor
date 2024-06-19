using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Controllers
{
    public interface IAuthRepository
    {
        //TODO: Login , Register , UserExist, OTP Validated, 2-Factor Authentication
        bool Login(string username,string password);
        
    }
}