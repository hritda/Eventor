using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Eventor.Models;
using Eventor.Dtos;
namespace Eventor.Controllers
{
    public class AuthController : BaseApiController//Eventor.Controllers.BaseApiController
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;

        }
        [HttpGet]
        public IActionResult GetUser()
        {
            User user = new User();
            user.FirstName = "Hrithik";
            user.LastName = "Mistry";
            user.UserTypes?.Add(new UserType() { ChangeBy = "someone", ChangeOn = DateTime.Now, MadeBy = "someelse", MadeOn = DateTime.Now.AddMinutes(2) });
            return Ok(user);
        }

        [HttpGet("login")]
        public IActionResult LoginUser()
        {
            LoginDto loginDto = new LoginDto();
            loginDto.username = "Hrithik";
            loginDto.password = "h00021132";
            var result = _authRepository.Login(loginDto.username, loginDto.password);

            loginDto.IsAutheticated = result;
            if (loginDto != null)
            {
                return Ok(loginDto);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}