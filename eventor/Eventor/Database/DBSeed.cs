using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;

namespace Eventor.Database
{
    public class DBSeed
    {
        public static void Seed(DataContext dbcontext)
        {
            dbcontext.Database.EnsureDeleted();
            dbcontext.Database.EnsureCreated();
            dbcontext.UserTypes.Add(new UserType
            {
                Name = "Organiser",
                Code = "0001",
                Status = "active"
            });
            dbcontext.UserTypes.Add(new UserType
            {
                Name = "Participant",
                Code = "0002",
                Status = "active"
            });

            dbcontext.Users.Add(new User()
            {
                FirstName = "Hrithik",
                LastName = "Mistry",
                Password = "h00021132",
                Email = "hrithik@gmail.com",
                UserTypes = [dbcontext.UserTypes.Local.Single(p => p.Code == "0001"),
                dbcontext.UserTypes.Local.Single(p => p.Code == "0002")]
            });
            dbcontext.Users.Add(new User()
            {
                FirstName = "Walter",
                LastName = "White",
                Password = "heisenberg",
                Email = "whw@gmail.com",
                UserTypes = [dbcontext.UserTypes.Local.Single(p => p.Code == "0002")]
            });

            dbcontext.SaveChanges();
        }
    }
}
