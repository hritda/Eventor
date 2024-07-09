using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Dtos;
using Eventor.Models;
using Microsoft.AspNetCore.Mvc;

namespace Eventor.Controllers
{
    public class EventController : BaseApiController
    {
        private readonly IEventRepository _eventRepository ;
        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository ;
        }

        [HttpPost("{userId}/createEvent")]
        public IActionResult CreateEvent([FromBody] AddEventDto addEventDto,string userId){
            AddEventDto addEvent = addEventDto;
            addEvent.OrganisedUserId = userId ;
            CreateEventConfirmDto createEventResp = _eventRepository.CreateEvent(addEvent);
            if(createEventResp.StatusCode == 200){
                return Ok(createEventResp);
            }
            else 
            return StatusCode(createEventResp.StatusCode,createEventResp.ErrorString);
        }
        [HttpGet("{userId}")]
        public IActionResult GetUserEvents(string userId){
            UserEventListDto eventList = new UserEventListDto();
            eventList = _eventRepository.GetUserEvents(userId);
            return Ok(eventList);
        }


    }
}