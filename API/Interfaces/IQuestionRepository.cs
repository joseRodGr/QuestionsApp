using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;

namespace API.Interfaces
{
    public interface IQuestionRepository
    {
         Task<IEnumerable<QuestionDto>>GetQuestionsAsked(string username);
         Task<IEnumerable<QuestionReceivedDto>> GetQuestionsReceived(string username);
         Task<Question>GetQuestionAsked(int id);
         Task<Question> GetQuestion(int id);
         Task<QuestionReceivedDto>GetQuestionReceived(int userId, int questionId);
         void AddQuestion(Question question);
         void AddUserQuestion(UserQuestion userQuestion);
         void DeleteQuestion(Question question);
         void UpdateQuestion(Question question);
         
    }
}