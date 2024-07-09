using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Dtos;
using Eventor.Models;

namespace Eventor.Controllers
{
    public interface IEventRepository
    {
        UserEventListDto GetUserEvents(string userId);
        CreateEventConfirmDto CreateEvent(AddEventDto addEvent);
    }
}