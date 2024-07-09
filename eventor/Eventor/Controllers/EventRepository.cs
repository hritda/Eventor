using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Database;
using Eventor.Dtos;
using Eventor.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Eventor.Controllers
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
        public EventRepository(DataContext context)
        {
            _context = context ;
        }

        public CreateEventConfirmDto CreateEvent(AddEventDto addEvent){
            User u = (User)_context.Users.Where(u => u.Uid == addEvent.OrganisedUserId);
            CreateEventConfirmDto createEventResp = new CreateEventConfirmDto();
            Event e = new Event{
                Venue = addEvent.Venue,
                Description = addEvent.Description,
                StartDate = addEvent.StartDate,
                EndDate = addEvent.EndDate,
                StartTime = addEvent.StartTime,
                EndTime = addEvent.EndTime,
                OrganisedBy = u,
                EventType = addEvent.EventType
            };
            _context.Events.Add(e);
              try
            {
                int affectedRows = _context.SaveChanges();
                createEventResp.CreatedEvent = e ;
                createEventResp.Message = "event created successfully";
            }
            catch (Exception ex)
            {
                createEventResp.IsError = true ;
                createEventResp.StatusCode = 500 ;
                createEventResp.ErrorString = "some error occurred while creating the event";
            }
            return createEventResp ;
        }
        public UserEventListDto GetUserEvents(string userId){
            List<Event> eventList = _context.Events.Include(e => e.OrganisedBy).Where(e => e.OrganisedBy.Uid == userId).ToList() ;
            UserEventListDto userEventList = new UserEventListDto();
            userEventList.userEventList = eventList ;
            if(eventList.Count == 0){
                userEventList.Message = "No events are created by this user";
            }
            return userEventList ;
        }

    }
}