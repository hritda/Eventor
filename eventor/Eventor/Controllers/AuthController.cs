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
            //return Ok(user);
            return this.sendResponse(user,"success");
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginDto loginDto)
        {  LoginResponseDto loginResponse = new LoginResponseDto();
            
            loginResponse = _authRepository.Login(loginDto);
            if(loginResponse.StatusCode == 200){
                return Ok(loginResponse);
            } else {
                return BadRequest(loginResponse);
            }
            
        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] RegisterDto user){
            var registerResponse = new RegisterResponseDto();
            registerResponse = _authRepository.Register(user);

            if(registerResponse.StatusCode == 200){
                return Ok(registerResponse);
            } else return BadRequest(registerResponse);
        } 
    }
}