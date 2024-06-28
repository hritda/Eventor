using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Dtos;
using Eventor.Models;

namespace Eventor.Controllers
{
    public interface IAuthRepository
    {
        //TODO: Login , Register , UserExist, OTP Validated, 2-Factor Authentication
        LoginDto Login(LoginDto loginDto);

        bool Register(RegisterDto user) ;
        
    }
}