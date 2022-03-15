using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class QuestionController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public QuestionController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("asked")]
        public async Task<ActionResult<IEnumerable<QuestionDto>>> GetQuestionsAsked()
        {
            var questions = await _unitOfWork.QuestionRepository.GetQuestionsAsked(User.GetUsername());
            return Ok(questions);
        }

        [HttpGet("received")]
        public async Task<ActionResult<IEnumerable<QuestionReceivedDto>>> GetQuestionsReceived()
        {
            var questionReceived = await _unitOfWork.QuestionRepository.GetQuestionsReceived(User.GetUsername());
            return Ok(questionReceived);
        }

        [HttpGet("asked/{id}", Name = "GetQuestion")]
        public async Task<ActionResult<QuestionDto>> GetQuestionAskedById(int id)
        {

            var question = await _unitOfWork.QuestionRepository.GetQuestionAsked(id);
            if (question == null) return NotFound("Could not find the question");

            if (question.Creator.UserName != User.GetUsername()) return Unauthorized();

            return _mapper.Map<QuestionDto>(question);
        }

        [HttpGet("received/{id}")]
        public async Task<ActionResult<QuestionReceivedDto>> GetQuestionReceivedById(int id)
        {

            var question = await _unitOfWork.QuestionRepository.GetQuestionReceived(User.GetId(), id);

            if (question == null) return NotFound("Could not find the question");

            return question;

        }

        [HttpPost]
        public async Task<ActionResult<QuestionDto>> CreateQuestion(QuestionCreateDto questionCreateDto)
        {

            var question = _mapper.Map<Question>(questionCreateDto);
            question.CreatorId = User.GetId();

            _unitOfWork.QuestionRepository.AddQuestion(question);

            if (await _unitOfWork.SaveAllAsync())
            {
                var questionSaved = await _unitOfWork.QuestionRepository.GetQuestionAsked(question.Id);
                return CreatedAtRoute("GetQuestion", new { id = question.Id }, _mapper.Map<QuestionDto>(questionSaved));
            }

            return BadRequest("Problem ocurred adding question");
        }

        [HttpPost("{username}")]
        public async Task<IActionResult> ShareQuestionToUser(string username, [FromQuery] int id)
        {
            var userShared = await _userManager.FindByNameAsync(username);

            if(userShared == null) NotFound("Could not find user to share");

            var question = await _unitOfWork.QuestionRepository.GetQuestionAsked(id);

            if(question == null) return NotFound("Could not find question");

            if(question.Creator.UserName != User.GetUsername()) return Unauthorized();

            if(!question.Shared) question.Shared = true;
    
            var userQuestion = new UserQuestion{
                UserId = userShared.Id,
                QuestionId = question.Id
            };

            _unitOfWork.QuestionRepository.AddUserQuestion(userQuestion);

            if(await _unitOfWork.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to share question to user");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<QuestionDto>> UpdateQuestion(int id, QuestionUpdateDto questionUpdateDto)
        {
            var question = await _unitOfWork.QuestionRepository.GetQuestionAsked(id);
            
            if(question == null) return NotFound();

            if(question.Creator.UserName != User.GetUsername()) return Unauthorized();

            if(question.Shared) return BadRequest("Can not modify a shared question");

            _mapper.Map(questionUpdateDto, question);

            _unitOfWork.QuestionRepository.UpdateQuestion(question);

            if(await _unitOfWork.SaveAllAsync()) return _mapper.Map<QuestionDto>(question);

            return BadRequest("Failed to update the question");
        }

        [HttpPut("open-close-question/{id}")]
        public async Task<IActionResult> CloseQuestion(int id)
        {
            var question = await _unitOfWork.QuestionRepository.GetQuestionAsked(id);

            if(question == null) return NotFound("Could not find question");

            if(question.Creator.UserName != User.GetUsername()) return Unauthorized();

            question.OpenQuestion = !question.OpenQuestion;

            _unitOfWork.QuestionRepository.UpdateQuestion(question);

            if(await _unitOfWork.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to close question");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _unitOfWork.QuestionRepository.GetQuestion(id);

            if(question == null) return NotFound("Could not find question");

            if(question.Creator.UserName != User.GetUsername()) return Unauthorized();

            _unitOfWork.QuestionRepository.DeleteQuestion(question);

            if(await _unitOfWork.SaveAllAsync()) return NoContent();

            return BadRequest("Problem deleting questions");
        }

    }
}