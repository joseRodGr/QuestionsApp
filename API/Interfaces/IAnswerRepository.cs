using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IAnswerRepository
    {
        void UpdateAnswer(Answer answer);
        void DeleteAnswer(Answer answer);
        void AddAnswer(Answer answer);
        Task<Answer> getAnswer(int id);
        Task<UserQuestion> getUserQuestion(int userId, int questionId);
         
    }
}