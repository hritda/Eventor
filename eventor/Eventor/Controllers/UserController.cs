using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Eventor.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Eventor.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
      public UserController(IUserRepository userRepository)
      {
        _userRepository = userRepository ;
      }

       [Authorize(AuthenticationSchemes ="token")]
       [HttpGet("")]
       public IActionResult GetUserDetails(){
        var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        Console.WriteLine(email);
        UserResponseDto userDetails = new UserResponseDto();
        userDetails.userData = null ;
        FailDto<UserResponseDto> getUserFail = new FailDto<UserResponseDto>();
        SuccessDto<UserResponseDto> getUserSuccess = new SuccessDto<UserResponseDto>();
        if(string.IsNullOrEmpty(email)){
                getUserFail.status = 401 ;
                getUserFail.message = "Invalid token";
                return sendError<UserResponseDto>(getUserFail);
             }
       var userDetailSuccess = _userRepository.GetUser(email);
       return  sendResponse<UserResponseDto> (userDetailSuccess.data,"received user successfully");
      
       }
    }
}