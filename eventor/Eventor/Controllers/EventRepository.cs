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
using SQLitePCL;

namespace Eventor.Controllers
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
        private readonly UserHelper _helper;
        public EventRepository(DataContext context, UserHelper helper)
        {
            _context = context;
            _helper = helper;
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

        public ResponseDto<EventDto> EventById(string eventUid)
        {

            SuccessDto<EventDto> eventSuccess = new SuccessDto<EventDto>();
            FailDto<EventDto> eventFail = new FailDto<EventDto>();
            EventDto eventDto = new EventDto();
            Event e = _context.Events.Include(e => e.OrganisedBy).FirstOrDefault(e => e.Uid == eventUid);
            if (e == null)
            {
                eventFail.message = "No such event found";
                eventFail.status = 404;
                return eventFail;
            }
            EventResponseDto ev = new EventResponseDto
            {
                Uid = e.Uid,
                Venue = e.Venue,
                Description = e.Description,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                EventType = e.EventType,
                EventName = e.EventName
            };
            eventDto.EventById = ev;
            eventSuccess.data = eventDto;
            return eventSuccess;
        }
        public ResponseDto<CreateEventConfirmDto> CreateEvent(AddEventDto addEvent)
        {
            User u = (User)_context.Users.FirstOrDefault(u => u.Uid == addEvent.OrganisedUserId);
            CreateEventConfirmDto createEventResp = new CreateEventConfirmDto();
            bool sameName = _context.Events.Include(e => e.OrganisedBy).Any(e => e.EventName == addEvent.EventName && e.OrganisedBy.Uid == addEvent.OrganisedUserId && e.DeleteFlag == 0);
            FailDto<CreateEventConfirmDto> createEventFail = new FailDto<CreateEventConfirmDto>();
            SuccessDto<CreateEventConfirmDto> createEventSuccess = new SuccessDto<CreateEventConfirmDto>();
            if (sameName)
            {
                createEventFail.message = "Event with this name already exists, please enter another name";
                return createEventFail;
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
                createEventSuccess.data = createEventResp;
                createEventSuccess.message = "event created successfully";
                return createEventSuccess;
            }
            catch (ValidationException ex)
            {
                createEventFail.message = "invalid event data";
                createEventFail.Errors = new List<Error>();

            }
            catch (Exception ex)
            {

            }
            return createEventFail;
        }


        public ResponseDto<UserEventListDto> GetUserEvents(string email)
        {
            User user = _helper.IsUserExistByEmail(email);
            List<Event> eventList = _context.Events.Include(e => e.OrganisedBy).Where(e => e.OrganisedBy.Uid == user.Uid && e.DeleteFlag == 0).ToList();
            List<EventResponseDto> eventResponseList = new List<EventResponseDto>();
            UserEventListDto userEventList = new UserEventListDto();
            foreach (var eventItem in eventList)
            {
                EventResponseDto eventResponse = new EventResponseDto
                {
                    Uid = eventItem.Uid,
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
            User u = (User)_context.Users.FirstOrDefault(u => u.Uid == user.Uid);
            userEventList.organisedBy = u;
            SuccessDto<UserEventListDto> userEventResponse = new SuccessDto<UserEventListDto>();
            if (eventResponseList.Count == 0)
            {
                userEventResponse.message = "No events are created by this user";
            }
            userEventResponse.message = "Event list successfully returned";
            userEventResponse.data = userEventList;
            return userEventResponse;
        }

        public ResponseDto<BaseDto> DeleteEvent(DeleteRequestDto deleteRequest, string email)
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
            FailDto<BaseDto> deleteFailed = new FailDto<BaseDto>();
            if (eventToDelete.OrganisedBy.Uid != user.Uid)
            {
                deleteFailed.status = 401;
                deleteFailed.message = "You are not allowed to delete this event";
                return deleteFailed;
            }
            SuccessDto<BaseDto> deleteSuccess = new SuccessDto<BaseDto>();
            try
            {
                eventToDelete.DeleteFlag = 1;
                _context.SaveChanges();
                deleteSuccess.data = null;
                deleteSuccess.message = "event deleted successfully";
                return deleteSuccess;
            }
            catch (Exception e)
            {

                deleteFailed.status = 500;
                deleteFailed.message = "some error occurred while deleting the event";
                return deleteFailed;
            }

            return deleteFailed;
        }
        public ResponseDto<UpdateEventConfirmDto> UpdateEvent(UpdateEventDto updateThisEvent, string email)
        {

            UpdateEventConfirmDto updateEventResp = new UpdateEventConfirmDto();
            Event eventToUpdate = _context.Events.Include(e => e.OrganisedBy).FirstOrDefault(e => e.Uid == updateThisEvent.EventId);
            User user = _helper.IsUserExistByEmail(email);
            if(user!=null){
                eventToUpdate.OrganisedBy = user ;
            }
            eventToUpdate.Venue = updateThisEvent.Venue;
            //eventToUpdate.OrganisedBy = eventToUpdate.OrganisedBy;
            eventToUpdate.StartDate = updateThisEvent.StartDate;
            eventToUpdate.Description = updateThisEvent.Description;
            eventToUpdate.EndDate = updateThisEvent.EndDate;
            eventToUpdate.StartTime = updateThisEvent.StartTime;
            eventToUpdate.EndTime = updateThisEvent.EndTime;
            eventToUpdate.EventType = updateThisEvent.EventType;
            eventToUpdate.EventName = updateThisEvent.EventName;
            SuccessDto<UpdateEventConfirmDto> updateEventSuccess = new SuccessDto<UpdateEventConfirmDto>();
            FailDto<UpdateEventConfirmDto> updateEventFailed = new FailDto<UpdateEventConfirmDto>();
            try
            {
                ValidateEvent(eventToUpdate);
                _context.SaveChanges();
                updateEventResp.UpdatedEvent = eventToUpdate;
                updateEventSuccess.data = updateEventResp;
                updateEventSuccess.message = "event updated successfully";
                return updateEventSuccess;

            }
            catch (ValidationException ex)
            {

                updateEventFailed.message = ex.ValidationResult.ErrorMessage;
                updateEventFailed.status = 400;
                return updateEventFailed;
            }
            catch (Exception e)
            {
                updateEventFailed.message = "Some error occurred creating the event";
                updateEventFailed.status = 500;
                return updateEventFailed;
            }

        }

    }
}