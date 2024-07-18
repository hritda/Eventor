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
       public IActionResult GetUserDetails(){
        var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        UserResponseDto userDetails = new UserResponseDto();
        userDetails.userData = null ;
        if(string.IsNullOrEmpty(email)){
                userDetails.IsError = true ;
                userDetails.ErrorString = "Invalid token";
                userDetails.StatusCode = 500 ;
                return  StatusCode(userDetails.StatusCode, userDetails);
             }
        userDetails = _userRepository.GetUser(email);
        return Ok(userDetails);
       }
    }
}