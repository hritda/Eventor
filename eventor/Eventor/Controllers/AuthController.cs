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

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginDto loginDto)
        {
            loginDto.IsPasswordCorrect = false;
            loginDto.IsUserPresent = false ;
            LoginDto loginDto1 = _authRepository.Login(loginDto);
            if(loginDto1.IsUserPresent == false)
             return new ObjectResult("User doesnt exist, please create one") {StatusCode = 403};
            if (loginDto1?.IsPasswordCorrect!= false)
            {
                return Ok(loginDto1);
            }
            else
            {
                return new ObjectResult("Invalid credentials") {StatusCode = 403};
            }
        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] RegisterDto user){
            var result = _authRepository.Register(user);

            if(result){
                return Ok(user);
            } else {
             
              return new ObjectResult("User already exists, please login") {StatusCode = 403};
            }
        } 
    }
}