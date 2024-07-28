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
            var createEventResp = _eventRepository.CreateEvent(addEvent);

            if (createEventResp.GetType() == typeof(SuccessDto<CreateEventConfirmDto>))
            {
                return sendResponse<CreateEventConfirmDto>(createEventResp.data, createEventResp.message);
            }
            else
            {
                return sendError<CreateEventConfirmDto>((FailDto<CreateEventConfirmDto>)createEventResp);
            }

        }
        [Authorize(AuthenticationSchemes = "token")]
        [HttpGet("{eventUid}")]
        public IActionResult GetEventByUid(string eventUid){
         
             var eventResp = _eventRepository.EventById(eventUid);
             if(eventResp.GetType() == typeof(FailDto<EventDto>)){
                return sendError<EventDto>((FailDto<EventDto>)eventResp);
             }
                return sendResponse<EventDto>(eventResp.data,"event receieved successfully");
        }

        [Authorize(AuthenticationSchemes = "token")]
        [HttpGet("")]

        public IActionResult GetUserEvents()
        {
            Console.Write(HttpContext.Request.Headers.Authorization);
            Console.Write("entered event controller");
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            UserEventListDto eventList = new UserEventListDto();
            FailDto<UserEventListDto> eventListFail = new FailDto<UserEventListDto>();
            if (string.IsNullOrEmpty(email))
            {   
                eventListFail.message = "Invalid token";
                eventListFail.status = 401;
                
                return sendError<UserEventListDto>(eventListFail);
            }
            var eventListSuccess  = _eventRepository.GetUserEvents(email);
            return sendResponse<UserEventListDto>(eventListSuccess.data,eventListSuccess.message);
        }
        [Authorize(AuthenticationSchemes = "token")]
        [HttpDelete("{eventId}")]
        public IActionResult DeleteUserEvent(string eventId)
        {
            Console.WriteLine("entered delete controller");
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            Console.WriteLine("delete controller email", email);
            DeleteRequestDto deleteEvent = new DeleteRequestDto();
           
            FailDto<BaseDto> deleteFailed = new FailDto<BaseDto>();
    
            if (string.IsNullOrEmpty(email))
            {
                deleteFailed.Errors = null ;
                deleteFailed.message = "Invalid token";
                
                deleteFailed.status = 500;
                return sendError<BaseDto>(deleteFailed);
            }
            deleteEvent.EventId = eventId;
             var deleteResponse = _eventRepository.DeleteEvent(deleteEvent, email);
            if (deleteResponse.GetType() == typeof(FailDto<BaseDto>))
            {
                return sendError<BaseDto>((FailDto<BaseDto>)deleteResponse);
            }
            else 
            return sendResponse<BaseDto>(deleteResponse.data, deleteResponse.message);
        }

        [HttpPut("users/{userId}/{eventId}")]
        public IActionResult UpdateUserEvent(UpdateEventDto updateEvent, string userId, string eventId)
        {
            UpdateEventDto updateThisEvent = updateEvent;
            updateThisEvent.EventId = eventId;
            updateThisEvent.OrganisedUserId = userId;
            var updateEventResp = _eventRepository.UpdateEvent(updateThisEvent);
            if (updateEventResp.GetType() == typeof(SuccessDto<UpdateEventConfirmDto>))
            {
                return sendResponse<UpdateEventConfirmDto>(updateEventResp.data, updateEventResp.message);
            }
            else
                return sendError<UpdateEventConfirmDto>((FailDto<UpdateEventConfirmDto>)updateEventResp);
        }


    }
}