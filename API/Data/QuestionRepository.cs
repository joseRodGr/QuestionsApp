using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Interfaces;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public QuestionRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public void AddQuestion(Question question)
        {
            _context.Questions.Add(question);
        }

        public void DeleteQuestion(Question question)
        {
            _context.Questions.Remove(question);
        }

        public async Task<Question> GetQuestionById(int id)
        {
            return await _context.Questions
                .Include(q => q.Answers)
                .Include(q => q.Creator)
                .SingleOrDefaultAsync(q => q.Id == id);
    
        }

        public async Task<IEnumerable<QuestionDto>> GetQuestionsByUsernameAsync(string username)
        {

            return await _context.Questions
                .Where(q => q.Creator.UserName == username)
                .ProjectTo<QuestionDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

        }

        public void UpdateQuestion(Question question)
        {
            _context.Entry(question).State = EntityState.Modified;
        }
    }
}