using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Dtos;
using Microsoft.AspNetCore.SignalR;

namespace Eventor.Controllers
{
    public interface IUserRepository
    {
        UserResponseDto GetUser(string email);
    }
}