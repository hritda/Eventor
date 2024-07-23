using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Database;
using Eventor.Dtos;
using Eventor.Helpers.UserHelperFunctions;
using Eventor.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Eventor.Controllers
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
         private readonly UserHelper _helper;
        public EventRepository(DataContext context, UserHelper helper)
        {
            _context = context;
            _helper = helper ;
        }
        public void ValidateEvent(Event e)
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(e, null, null);

            if (!Validator.TryValidateObject(e, validationContext, validationResults, true))
            {
                throw new ValidationException(string.Join("; ", validationResults));
            }

            var customValidationResults = e.Validate(validationContext);
            //Console.WriteLine(customValidationResults.First());
            if (customValidationResults != null)
            {
                foreach (var validationResult in customValidationResults)
                {
                    validationResults.Add(validationResult);
                }
            }

            if (validationResults.Count > 0)
            {
                throw new ValidationException(string.Join("; ", validationResults));
            }
        }
        public CreateEventConfirmDto CreateEvent(AddEventDto addEvent)
        {
            User u = (User)_context.Users.FirstOrDefault(u => u.Uid == addEvent.OrganisedUserId);
            CreateEventConfirmDto createEventResp = new CreateEventConfirmDto();
            bool sameName = _context.Events.Include(e => e.OrganisedBy).Any(e => e.EventName == addEvent.EventName && e.OrganisedBy.Uid == addEvent.OrganisedUserId);
            if(sameName){
                createEventResp.CreatedEvent = null;
                createEventResp.Message = "Event with this name already exists, please enter another name";
                return createEventResp ;
            }
            Event e = new Event
            {
                Venue = addEvent.Venue,
                Description = addEvent.Description,
                StartDate = addEvent.StartDate,
                EndDate = addEvent.EndDate,
                StartTime = addEvent.StartTime,
                EndTime = addEvent.EndTime,
                OrganisedBy = u,
                EventType = addEvent.EventType,
                EventName = addEvent.EventName
            };

            try
            {
                ValidateEvent(e);
                _context.Events.Add(e);
                int affectedRows = _context.SaveChanges();
                createEventResp.CreatedEvent = e;
                createEventResp.Message = "event created successfully";
            }
            catch (ValidationException ex)
            {
                
                createEventResp.Message = ex.Message;
            }
            catch (Exception ex)
            {
                createEventResp.IsError = true;
                createEventResp.StatusCode = 500;
                createEventResp.ErrorString = "some error occurred while creating the event";
            }
            return createEventResp;
        }

       
        public UserEventListDto GetUserEvents(string userId)
        {
           
            List<Event> eventList = _context.Events.Include(e => e.OrganisedBy).Where(e => e.OrganisedBy.Uid == userId && e.DeleteFlag == 0).ToList();
            List<EventResponseDto> eventResponseList = new List<EventResponseDto>();
            UserEventListDto userEventList = new UserEventListDto();
            foreach (var eventItem in eventList)
            {
                EventResponseDto eventResponse = new EventResponseDto
                {   Uid = eventItem.Uid,
                    Venue = eventItem.Venue,
                    Description = eventItem.Description,
                    StartDate = eventItem.StartDate,
                    EndDate = eventItem.EndDate,
                    StartTime = eventItem.StartTime,
                    EndTime = eventItem.EndTime,
                    EventType = eventItem.EventType,
                    EventName = eventItem.EventName
                };
                eventResponseList.Add(eventResponse);
            }
            userEventList.userEventList = eventResponseList;
            User u = (User)_context.Users.FirstOrDefault(u => u.Uid == userId);
            userEventList.organisedBy = u;
            if (eventList.Count == 0)
            {
                userEventList.Message = "No events are created by this user";
            }
            return userEventList;
        }

        public BaseDto DeleteEvent(DeleteRequestDto deleteRequest,string email)
        {
            BaseDto deleteConfirm = new BaseDto();
            Event eventToDelete = new Event();
            // Console.WriteLine(_context);
            // Console.WriteLine(deleteRequest.EventId);
            // Console.WriteLine(deleteRequest.UserId);
            eventToDelete = _context.Events.Include(e => e.OrganisedBy).FirstOrDefault(e => e.Uid == deleteRequest.EventId);
            User user = _helper.IsUserExistByEmail(email);
            // Console.WriteLine(eventToDelete.OrganisedBy == null);
            // Console.WriteLine(eventToDelete.OrganisedBy);
            if (eventToDelete.OrganisedBy.Uid != user.Uid)
            {
                deleteConfirm.StatusCode = 401;
                deleteConfirm.Message = "You are not allowed to delete this event";
                return deleteConfirm;
            }

            try
            {
                eventToDelete.DeleteFlag = 1;
                _context.SaveChanges();
                deleteConfirm.Message = "event deleted successfully";
            }
            catch (Exception e)
            {
                deleteConfirm.IsError = true;
                deleteConfirm.StatusCode = 500;
                deleteConfirm.ErrorString = "some error occurred while deleting the event";
            }

            return deleteConfirm;
        }
        public UpdateEventConfirmDto UpdateEvent(UpdateEventDto updateThisEvent)
        {

            UpdateEventConfirmDto updateEventResp = new UpdateEventConfirmDto();
            Event eventToUpdate = _context.Events.Include(e => e.OrganisedBy).FirstOrDefault(e => e.Uid == updateThisEvent.EventId);

            eventToUpdate.Venue = updateThisEvent.Venue;
            //eventToUpdate.OrganisedBy = eventToUpdate.OrganisedBy;
            eventToUpdate.StartDate = updateThisEvent.StartDate;
            eventToUpdate.Description = updateThisEvent.Description;
            eventToUpdate.EndDate = updateThisEvent.EndDate;
            eventToUpdate.StartTime = updateThisEvent.StartTime;
            eventToUpdate.EndTime = updateThisEvent.EndTime;
            eventToUpdate.EventType = updateThisEvent.EventType;
            eventToUpdate.EventName = updateThisEvent.EventName;

            try
            {
                ValidateEvent(eventToUpdate);
                _context.SaveChanges();
                updateEventResp.UpdatedEvent = eventToUpdate;
                updateEventResp.Message = "Event updated successfully";
            }
            catch (ValidationException ex)
            {
                
                updateEventResp.Message = ex.Message;
            }
            catch (Exception e)
            {
                updateEventResp.IsError = true;
                updateEventResp.StatusCode = 500;
                updateEventResp.ErrorString = "some error occurred while creating the event";
            }
            return updateEventResp;
        }

    }
}