using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Eventor.Database;
using Eventor.Dtos;
using Eventor.Models;
using Microsoft.IdentityModel.Tokens;


namespace Eventor.Helpers.UserHelperFunctions

{
    public  class UserHelper
    {
        private readonly DataContext _dbcontext;
        public UserHelper(DataContext context){
            _dbcontext = context;
        }
        public User IsUserExistByEmail(string email){
            User user= _dbcontext.Users.FirstOrDefault(u => u.Email == email);
            if(user!=null) return user ;
            return null;
        }
        public  string GenerateJSONWebToken(LoginDto loginDto,IConfiguration config)
        {
            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();
            ClaimsIdentity cli =  new ClaimsIdentity(new[]
            {
                new Claim("email",loginDto.Email),
                new Claim("userTypes",loginDto.UserType.ToString())
                
            });
            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(issuer:config["Jwt:Issuer"],
              audience:config["Jwt:Issuer"],
              subject:cli,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString ;
            // return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}