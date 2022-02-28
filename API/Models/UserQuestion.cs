namespace API.Models
{
    public class UserQuestion
    {
        public int UserId { get; set; }
        public int QuestionId { get; set; }
        public AppUser User{ get; set; }
        public Question Question { get; set; }
    }
}