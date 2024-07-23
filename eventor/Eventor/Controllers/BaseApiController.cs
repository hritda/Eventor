using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace Eventor.Controllers
{
  [ApiController]
  [Route("api/[controller]s")]
  public class BaseApiController : ControllerBase
  {
    protected IActionResult sendResponse<T>(T data, string message = "")
    {
      SuccessDto<T> s = new SuccessDto<T>();
      s.data = data;
      s.message = message;
      return Ok(s);
    }
    protected IActionResult sendError<T>(string message, ErrorsDto<T>? errors = null)
    {
      ErrorDto<T> e = new ErrorDto<T>();
      e.errors = errors;
      e.message = message;
     return StatusCode(400, e);
    }

  }
}