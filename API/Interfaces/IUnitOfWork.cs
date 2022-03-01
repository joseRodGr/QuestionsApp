using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IQuestionRepository QuestionRepository { get;}
        IAnswerRepository AnswerRepository {get;}
        Task<bool> SaveAllAsync();
    }
}