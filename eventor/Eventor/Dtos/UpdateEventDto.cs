using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Dtos
{
    public class UpdateEventDto
    {
        public string EventId { get; set; }
        public string EventName { get; set; }
        public string OrganisedUserId { get; set; }
        public string Venue { get; set; }
        public string Description { get; set; }
        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string EventType { get; set; }
    }
}