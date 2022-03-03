using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly DataContext _context;
        public AnswerRepository(DataContext context)
        {
            _context = context;

        }
        public void AddAnswer(Answer answer)
        {
            _context.Answers.Add(answer);
        }

        public void DeleteAnswer(Answer answer)
        {
            _context.Answers.Remove(answer);
        }

        public async Task<Answer> getAnswer(int id)
        {
            return await _context.Answers
                .Include(x => x.Question)
                .ThenInclude(q => q.Creator)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<UserQuestion> getUserQuestion(int userId, int questionId)
        {
            return await _context.UserQuestions
                .Include(uq => uq.Question)
                .SingleOrDefaultAsync(uq => uq.UserId == userId && uq.QuestionId == questionId);

        }

        public void UpdateAnswer(Answer answer)
        {
            _context.Entry(answer).State = EntityState.Modified;
        }
    }
}