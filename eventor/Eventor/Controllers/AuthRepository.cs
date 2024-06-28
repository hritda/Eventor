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
namespace Eventor.Controllers
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    private readonly UserHelper _helper;
    public AuthRepository(DataContext context, UserHelper helper)
    {
      _context = context;
      _helper = helper;
    }
    public LoginDto Login(LoginDto loginDto)
    {
      User user = _helper.IsUserExistByEmail(loginDto.Email);
     if (user==null)
      {
        loginDto.IsUserPresent = false;
        return loginDto;
      }
      loginDto.IsUserPresent = true ; 
      if(user.Password == loginDto.Password){
        loginDto.IsPasswordCorrect = true ;
      } else loginDto.IsPasswordCorrect = false;

      return loginDto;
    }
    public bool Register(RegisterDto reguser)
    {  User user = _helper.IsUserExistByEmail(reguser.Email);
      if (user!=null)
      {
        return false;
      }
      //get the list of usertype objects based on code
      List<string> utypeCodes = reguser.UserTypeCodes;
      List<UserType> utypes = new List<UserType>();
      foreach (string userTypeCode in utypeCodes)
      {
        var utypeobj = _context.UserTypes.Where(ut => ut.Code == userTypeCode).FirstOrDefault();
        utypes.Add(utypeobj);
      }
      User u = new User();
      u.FirstName = user.FirstName;
      u.LastName = user.LastName;
      u.Email = user.Email;
      u.Password = user.Password;
      u.UserTypes = utypes;
      _context.Add(u);
      _context.SaveChanges();
      return true;
    }
  }
}