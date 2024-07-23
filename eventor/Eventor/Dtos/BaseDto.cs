using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class SuccessDto<T>
    {
        public bool status { get; set; } = true;
        public string message { get; set; } = "";

        public T? data { get; set; }

    }
    public class ErrorsDto<T>
    {
        public List<Error> Errors { get; set; }

        public ErrorsDto()
        {
            Errors = new List<Error>();
        }

        public ErrorsDto(T obj)
        {
            Errors = new List<Error>();
            var properties = typeof(T).GetProperties();
            foreach (var property in properties)
            {
                var errors = property.GetCustomAttributes(typeof(ValidationAttribute), true);
                foreach (var error in errors)
                {
                    var validationError = error as ValidationAttribute;
                    if (validationError != null)
                    {
                        Errors.Add(new Error { PropertyName = property.Name, ErrorMessage = validationError.ErrorMessage });
                    }
                }
            }
        }
    }

    public class Error
    {
        public string? PropertyName { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public class ErrorDto<T>
    {
        public bool status { get; set; } = false;
        public string message { get; set; } = "";

        public ErrorsDto<T>? errors { get; set; }
    }
}