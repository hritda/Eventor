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
            return this.sendResponse(user, "success");
        }

        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginDto loginDto)
        {
          

            var responseDto = _authRepository.Login(loginDto);
            if (responseDto.GetType() == typeof(FailDto<LoginResponseDto>))
            {
                FailDto<LoginResponseDto> failresp = (FailDto<LoginResponseDto>)responseDto ;
                return sendError<LoginResponseDto>(failresp);

            }
            else
            {
               
                
                return sendResponse<LoginResponseDto>(responseDto?.data,"success login") ;
            }

        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] RegisterDto user)
        {
           
            var registerResponse = _authRepository.Register(user);

          if (registerResponse.GetType() == typeof(SuccessDto<RegisterResponseDto>))
            {

                return Ok(sendResponse<RegisterResponseDto>(registerResponse?.data,"invalid credentials"));

            }
            return sendError<RegisterResponseDto>((FailDto<RegisterResponseDto>)registerResponse);

        }
    }
}