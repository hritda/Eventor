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

        
        public ResponseDto<UserResponseDto> GetUser(string email)
        {
            User user = _helper.IsUserExistByEmail(email);
            FailDto<UserResponseDto> getUserFail = new FailDto<UserResponseDto>();
            SuccessDto<UserResponseDto> getUserSuccess = new SuccessDto<UserResponseDto>();
            UserResponseDto userResponse = new UserResponseDto();
            if (user == null)
            {
                getUserFail.message = "User doesnt exist";
                getUserFail.status = 401;
                return getUserFail;
            }
            userResponse.userData = user ;
            getUserSuccess.data = userResponse ;
            return getUserSuccess ;
        }


    }
}