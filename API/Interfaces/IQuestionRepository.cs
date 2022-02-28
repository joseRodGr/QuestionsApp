using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;

namespace API.Interfaces
{
    public interface IQuestionRepository
    {
         Task<IEnumerable<QuestionDto>>GetQuestionsByUsernameAsync(string username);
         Task<Question>GetQuestionById(int id);
         void AddQuestion(Question question);
         void DeleteQuestion(Question question);
         void UpdateQuestion(Question question);
         
    }
}