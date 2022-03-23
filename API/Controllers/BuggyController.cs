using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        [HttpGet("bad-request-string")]
        public IActionResult getBadRequestString(){
            return BadRequest("Bad request error ocurred");
        }
        
        [HttpGet("bad-request-object")]
        public IActionResult getBadRequestObject(){
            return BadRequest();
        }

        [HttpGet("not-found-string")]
        public IActionResult getNotFoundString(){
            return NotFound("Not found error");
        }

        [HttpGet("not-found-object")]
        public IActionResult getNotFoundObject(){
            return NotFound();
        }

        [HttpGet("not-authorize-string")]
        public IActionResult getUnauthorizedString(){
            return Unauthorized("You're not authorize");
        }

        [HttpGet("not-authorize-object")]
        public IActionResult getUnauthorizedObject(){
            return Unauthorized();
        }

        [HttpGet("server-error")]
        public IActionResult getServerError(){

            throw new Exception("Ocurred a server error");
        }


    }
}