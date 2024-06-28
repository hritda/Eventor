using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Database;
using Eventor.Models;


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
        
    }
}