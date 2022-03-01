using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class AnswerController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AnswerController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateAnswer(int id, AnswerContentDto answerContentDto)
        {
            var answer = await _unitOfWork.AnswerRepository.getAnswer(id);

            if (answer == null) return NotFound("Could not find answer");

            if (answer.Question.Creator.UserName != User.GetUsername()) return Unauthorized();

            if (answer.Question.Shared) return BadRequest("Can not modify a shared question");

            answer.Content = answerContentDto.Content;

            _unitOfWork.AnswerRepository.UpdateAnswer(answer);

            if (await _unitOfWork.SaveAllAsync()) return NoContent();

            return BadRequest("Problem to update answer");
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAnswer(int id)
        {
            var answer = await _unitOfWork.AnswerRepository.getAnswer(id);

            if (answer == null) return NotFound("Could not find answer");

            if (answer.Question.Creator.UserName != User.GetUsername()) return Unauthorized();

            if (answer.Question.Shared) return BadRequest("Can not modify a shared question");

            _unitOfWork.AnswerRepository.DeleteAnswer(answer);

            if (await _unitOfWork.SaveAllAsync()) return NoContent();

            return BadRequest("Problem deleting answer");
        }

        [HttpPost("add/{id}")]
        public async Task<ActionResult<AnswerDto>> AddAnswer(int questionId, AnswerContentDto answerContentDto)
        {
            var question = await _unitOfWork.QuestionRepository.GetQuestionAsked(questionId);

            if (question == null) return NotFound("Could not find question");

            if (question.Creator.UserName != User.GetUsername()) return Unauthorized();

            if(question.Shared) return BadRequest("Can not modify a shared question");

            var newAnswer = _mapper.Map<Answer>(answerContentDto);

            question.Answers.Add(newAnswer);

            if(await _unitOfWork.SaveAllAsync()) return _mapper.Map<AnswerDto>(newAnswer);

            return BadRequest("Failed to Add answer to the question");

        }

        [HttpPut("choose/{id}")]
        public async Task<IActionResult> ChooseAnswer(int id)
        {
            var answer = await _unitOfWork.AnswerRepository.getAnswer(id);

            if(answer == null) return NotFound("Could not find answer");

            var userQuestion = await _unitOfWork.AnswerRepository.getUserQuestion(User.GetId(), answer.QuestionId);

            if(userQuestion == null) return Unauthorized();

            if(userQuestion.hasAnswered) return BadRequest("The question already has been answered");

            answer.Count = answer.Count + 1;
            userQuestion.hasAnswered = true;

            if(await _unitOfWork.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to choose the answer");
        }


    }
}