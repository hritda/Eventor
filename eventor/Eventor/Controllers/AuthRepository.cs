using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;
using Eventor.Helpers.UserHelperFunctions;
using SQLitePCL;
using Eventor.Database;
using System.Runtime.InteropServices;
using Eventor.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.Win32;
namespace Eventor.Controllers
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    private readonly IConfiguration _config;
    private readonly UserHelper _helper;
    public AuthRepository(DataContext context, UserHelper helper, IConfiguration config)
    {
      _context = context;
      _config = config;
      _helper = helper;
    }
    public ResponseDto<LoginResponseDto> Login(LoginDto loginDto)
    {
      LoginResponseDto loginResponse = new LoginResponseDto();
      Console.WriteLine($"UserType:{loginDto.UserType}");
      User user = _helper.IsUserExistByEmail(loginDto?.Email);
      if (user == null)
      {

                var failresponse = new FailDto<LoginResponseDto>
                {
                    data = null,
                    message = "USER DOESNT exist",
                    Errors = new List<Error>(),
                    status = 400
                };
                failresponse.Errors.Add(new Error()
        {
          ErrorMessage = "user doesnt exist",
          PropertyName = "User"
        });
        return failresponse;
      }
      loginResponse.currUser = user;
      if (user?.Password == loginDto.Password)
      {

        
        loginResponse.Token = _helper.GenerateJSONWebToken(loginDto, _config);
        //loginDto.IsPasswordCorrect = true ;

        var successResponse = new SuccessDto<LoginResponseDto>();
        
        successResponse.message = "logged in successfully";
        successResponse.data = loginResponse ;
      
        return successResponse;
      }
      else
      {

        var failresponse = new FailDto<LoginResponseDto>();
        failresponse.data = null;
        failresponse.message = "invalid credentials";
        failresponse.status = 401 ;
        failresponse.Errors = new List<Error>();
        failresponse.Errors.Add(new Error()
        {
          ErrorMessage = "invalid credentials",
          PropertyName = "credentials"
        });
        return failresponse;

      }
    }
    public ResponseDto<RegisterResponseDto> Register(RegisterDto reguser)
    {
      var registerResponse = new RegisterResponseDto();
      User user = _helper.IsUserExistByEmail(reguser.Email);
      ResponseDto<RegisterResponseDto> registerSuccess = new SuccessDto<RegisterResponseDto>();
       ResponseDto<RegisterResponseDto> registerFail = new FailDto<RegisterResponseDto>();
      if (user != null)
      {
        
         registerFail.data = null ;
         registerFail.status = 400;
         registerFail.message = "User already exists, please login with email";
        return registerFail;
      }
      //get the list of usertype objects based on code
      List<string> utypeCodes = reguser.UserTypeCodes;
      List<UserType> utypes = [];
      foreach (string userTypeCode in utypeCodes)
      {
        var utypeobj = _context.UserTypes.Where(ut => ut.Code == userTypeCode).FirstOrDefault();
        utypes.Add(utypeobj);
      }
      User u = new User
      {
        FirstName = reguser.FirstName,
        LastName = reguser.LastName,
        Email = reguser.Email,
        Password = reguser.Password,
        UserTypes = utypes
      };
      try
      {
        _context.Add(u);
        _context.SaveChanges();
         registerSuccess.message = "You have been registered successfully";
         return registerSuccess ;
      }
      catch (ValidationException vex)
      {
        registerFail.status = 401;
        registerFail.message = vex.Message;

      }
      catch (Exception ex)
      {
         registerFail.status = 400;
        registerFail.message = ex.Message;
      }
      return registerFail ;
    }
  }
}