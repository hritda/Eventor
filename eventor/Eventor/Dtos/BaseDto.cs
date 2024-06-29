using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Dtos
{
    public class BaseDto
    {
        public int StatusCode { get; set; } = 200;
        public string Message { get; set; } = "";

        public bool IsError { get; set; } = false;
        public string ErrorString { get; set; } = "";
    }
}