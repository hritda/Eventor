using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Database;
using Eventor.Models;
using Microsoft.EntityFrameworkCore;

namespace Eventor.Dal
{
    public class User_dal
    {

        private readonly DataContext _dbcontext;
        public User_dal(DataContext context)
        {
            _dbcontext = context;
        }
        public User IsUserExistByEmail(string email)
        {
            User user = _dbcontext.Users.FirstOrDefault(u => u.Email == email);
            if (user != null) return user;
            return null;
        }
    }
}