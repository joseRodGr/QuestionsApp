using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IQuestionRepository QuestionRepository { get;}
        Task<bool> SaveAllAsync();
    }
}