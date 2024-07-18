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
    public LoginResponseDto Login(LoginDto loginDto)
    {
      var loginResponse = new LoginResponseDto();
      Console.WriteLine($"UserType:{loginDto.UserType}");
      User user = _helper.IsUserExistByEmail(loginDto?.Email);
      if (user == null)
      {
        loginResponse.Message = "User doesnt exist, please register";
        loginResponse.StatusCode = 404;

      }
      loginResponse.currUser = user ;
      if (user?.Password == loginDto.Password)
      {

        loginResponse.Message = "logged in successfully";
        loginResponse.Token = _helper.GenerateJSONWebToken(loginDto, _config);
        //loginDto.IsPasswordCorrect = true ;

      }
      else
      {

        loginResponse.Message = "invalid credentials";
        loginResponse.StatusCode = 404;

      }

      return loginResponse;
    }
    public RegisterResponseDto Register(RegisterDto reguser)
    {
      var registerResponse = new RegisterResponseDto();
      User user = _helper.IsUserExistByEmail(reguser.Email);
      if (user != null)
      {
        registerResponse.StatusCode = 400;
        registerResponse.Message = "User already exists, please login with email";
        return registerResponse;
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
        registerResponse.Message = "You have been registered successfully";
      }
      catch (ValidationException vex)
      {
        registerResponse.StatusCode = 400 ;
        registerResponse.Message = vex.Message;
      }
      catch (Exception ex)
      {
        registerResponse.IsError = true ;
        registerResponse.StatusCode = 500 ;
        registerResponse.ErrorString = "Some error occurred in registering the user" ;
      }
      return registerResponse;
    }
  }
}