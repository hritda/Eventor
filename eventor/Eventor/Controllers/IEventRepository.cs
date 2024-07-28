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
        ResponseDto<UserEventListDto> GetUserEvents(string email);
        ResponseDto<CreateEventConfirmDto> CreateEvent(AddEventDto addEvent);
        ResponseDto<UpdateEventConfirmDto> UpdateEvent(UpdateEventDto updateThisEvent);
        ResponseDto<BaseDto> DeleteEvent(DeleteRequestDto deleteRequest, string email);
        ResponseDto<EventDto> EventById(string eventUid);
    }
}