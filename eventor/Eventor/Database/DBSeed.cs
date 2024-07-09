using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;

namespace Eventor.Database
{
    public class DBSeed
    {
        public static async Task Seed(DataContext dbcontext)
        {
            // var last = dbcontext.Users.OrderByDescending(s => s.Id).FirstOrDefault();
            // dbcontext.Users.Remove(last);
            // dbcontext.SaveChanges();
            // Console.WriteLine("last record deleted");
            // dbcontext.Database.EnsureDeleted();
            // dbcontext.Database.EnsureCreated();
             if (dbcontext.Users.Any()) return;

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
            dbcontext.Events.Add(new Event()
            {
                OrganisedBy = dbcontext.Users.Local.Single(u => u.FirstName == "Hrithik" ),
                Venue = "Mumbai",
                Description = "Marathon",
                StartDate = new DateOnly(2024, 6, 5),
                EndDate = new DateOnly(2024, 6, 9),
                StartTime = new TimeOnly(12, 49),
                EndTime = new TimeOnly(13, 45),
                EventType = "online",

            });
            dbcontext.SaveChanges();
        }
    }
}
