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
    protected IActionResult sendError<T>(FailDto<T>? errors = null)
    {
      // FailDto<T> e = new FailDto<T>();
      // e.Errors = errors?.Errors;
      // e.message = message;
     return StatusCode(errors.status, errors);
    }

  }
}