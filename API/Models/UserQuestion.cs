namespace API.Models
{
    public class UserQuestion
    {
        public int UserId { get; set; }
        public int QuestionId { get; set; }
        public bool hasAnswered { get; set; } = false;
        public AppUser User{ get; set; }
        public Question Question { get; set; }
    }
}