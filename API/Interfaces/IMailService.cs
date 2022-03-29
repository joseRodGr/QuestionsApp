using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(string toEmail, string subject, string content);
    }
}