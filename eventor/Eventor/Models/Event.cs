using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Eventor.Models
{
    public class Event : BaseModel, IValidatableObject
    {
        public int Id { get; set; }

        public string EventName { get; set; }
        public User OrganisedBy { get; set; }

        //[Required(AllowEmptyStrings = false, ErrorMessage = "Venue cannot be empty")]
        public string Venue { get; set; }

        //[Required(AllowEmptyStrings = false, ErrorMessage = "Description cannot be empty")]
        public string Description { get; set; }

        //[Required]
        public DateOnly StartDate { get; set; }
       // [Required]
        public DateOnly EndDate { get; set; }

       // [Required]
        public TimeOnly StartTime { get; set; }

        //[Required]
        public TimeOnly EndTime { get; set; }

       // [Required(AllowEmptyStrings = false, ErrorMessage = "Event type cannot be empty")]
        public string EventType { get; set; }

        public int DeleteFlag { get; set; } = 0;//0 for not deleted and 1 for deleted by the user

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();

            if (EndDate < StartDate)
            {
                results.Add(new ValidationResult("End date must be after start date", new[] { nameof(EndDate) }));
            }

            if (StartDate == EndDate && EndTime<=StartTime)
            {
                results.Add(new ValidationResult("End time must be after start time", new[] { nameof(EndTime) }));
            }

            return results;
        }
    }
}