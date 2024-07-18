using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Database;
using Eventor.Dtos;
using Eventor.Helpers.UserHelperFunctions;
using Eventor.Models;

namespace Eventor.Controllers
{
    public class UserRepository : IUserRepository
    {
         private readonly DataContext _context;
          private readonly UserHelper _helper;

           public UserRepository(DataContext context, UserHelper helper)
        {
            _context = context;
            _helper = helper;
        }
        public UserResponseDto GetUser(string email){
            User user = _helper.IsUserExistByEmail(email);
            UserResponseDto userResponse  = new UserResponseDto();
            if(user==null){
                userResponse.userData = null ;
               userResponse.Message = "user doesnt exist";
               return userResponse ;
            }
            userResponse.userData = user;
            return userResponse ;
        }
           
        
    }
}