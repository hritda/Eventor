using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Eventor.Dtos;
using Eventor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eventor.Controllers
{
    public class EventController : BaseApiController
    {
        private readonly IEventRepository _eventRepository;
        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpPost("users/{userId}")]
        public IActionResult CreateEvent([FromBody] AddEventDto addEventDto, string userId)
        {
            AddEventDto addEvent = addEventDto;
            addEvent.OrganisedUserId = userId;
            CreateEventConfirmDto createEventResp = _eventRepository.CreateEvent(addEvent);
            if (createEventResp.StatusCode == 200)
            {
                return Ok(createEventResp);
            }
            else
                return StatusCode(createEventResp.StatusCode, createEventResp);
        }

        [Authorize(AuthenticationSchemes = "token")]
        [HttpGet("users/{userId}")]

        public IActionResult GetUserEvents(string userId)
        {
            Console.Write(HttpContext.Request.Headers.Authorization);
            Console.Write("entered event controller");
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            UserEventListDto eventList = new UserEventListDto();
            if (string.IsNullOrEmpty(email))
            {
                eventList.IsError = true;
                eventList.ErrorString = "Invalid token";
                eventList.StatusCode = 500;
                return StatusCode(eventList.StatusCode, eventList);
            }
            eventList = _eventRepository.GetUserEvents(userId);
            return Ok(eventList);
        }
        [Authorize(AuthenticationSchemes = "token")]
        [HttpDelete("{eventId}")]
        public IActionResult DeleteUserEvent(string eventId)
        {   Console.WriteLine("entered delte controller");
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            Console.WriteLine("delete controller email",email);
            DeleteRequestDto deleteEvent = new DeleteRequestDto();
            BaseDto deleteConfirm = new BaseDto();
            if (string.IsNullOrEmpty(email))
            {
               deleteConfirm.IsError = true;
                deleteConfirm.ErrorString = "Invalid token";
                deleteConfirm.StatusCode = 500;
                return StatusCode(deleteConfirm.StatusCode, deleteConfirm);
            }
            deleteEvent.EventId = eventId;
            deleteConfirm = _eventRepository.DeleteEvent(deleteEvent,email);
            if (deleteConfirm.StatusCode != 200)
            {
                return StatusCode(deleteConfirm.StatusCode, deleteConfirm);
            }
            return Ok(deleteConfirm);
        }
        [HttpPut("users/{userId}/{eventId}")]
        public IActionResult UpdateUserEvent(UpdateEventDto updateEvent, string userId, string eventId)
        {
            UpdateEventDto updateThisEvent = updateEvent;
            updateThisEvent.EventId = eventId;
            updateThisEvent.OrganisedUserId = userId;
            UpdateEventConfirmDto updateEventResp = _eventRepository.UpdateEvent(updateThisEvent);
            if (updateEventResp.StatusCode == 200)
            {
                return Ok(updateEventResp);
            }
            else
                return StatusCode(updateEventResp.StatusCode, updateEventResp);
        }


    }
}