using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;

namespace Eventor.Dtos
{
    public class EventDto : BaseDto
    {
        public EventResponseDto EventById { get; set; }  
    }
}