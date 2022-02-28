
using System.Collections.Generic;
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
    public class QuestionController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public QuestionController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionDto>>> GetQuestions()
        {

            var questions = await _unitOfWork.QuestionRepository.GetQuestionsByUsernameAsync(User.GetUsername());
            return Ok(questions);
        }

        [HttpGet("{id}", Name ="GetQuestion")]
        public async Task<ActionResult<QuestionDto>> GetQuestionById(int id)
        {

            var question = await _unitOfWork.QuestionRepository.GetQuestionById(id);
            if (question == null) return NotFound();

            if (question.Creator.UserName != User.GetUsername()) return Unauthorized();

            return _mapper.Map<QuestionDto>(question);
        }

        [HttpPost]
        public async Task<ActionResult<QuestionDto>> CreateQuestion(QuestionCreateDto questionCreateDto)
        {          
            
            var question = _mapper.Map<Question>(questionCreateDto);
            question.CreatorId = User.GetId();

            _unitOfWork.QuestionRepository.AddQuestion(question);

            if(await _unitOfWork.SaveAllAsync()){
                
                var questionSaved = await _unitOfWork.QuestionRepository.GetQuestionById(question.Id);
                return CreatedAtRoute("GetQuestion", new {id = question.Id}, _mapper.Map<QuestionDto>(questionSaved));
            }

            return BadRequest("Problem ocurred adding question");

        }


    }
}