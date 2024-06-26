using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Database;

namespace Eventor.Helpers.User
{
    public  class UserHelper
    {
        private readonly DataContext _dbcontext;
        public UserHelper(DataContext context){
            _dbcontext = context;
        }
        public bool IsUserExist(string email){
            bool userExists = _dbcontext.Users.Any(u => u.Email == email);
            if(userExists) return true ;
            return false;
        }
    }
}