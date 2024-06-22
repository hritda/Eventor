using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;

namespace Eventor.Controllers
{
    public class AuthRepository : IAuthRepository
    {
        public bool Login(string username, string password)
        {
           bool result = false;
           if( password == "h00021132" &&  username == "Hrithik"){
            return true;
           }
           return result;
        }
        public bool Register(User user){
         
          return true ;
        }
    }
}