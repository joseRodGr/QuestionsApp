namespace API.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Count { get; set; } = 0;
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}