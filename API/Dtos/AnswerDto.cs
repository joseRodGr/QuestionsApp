namespace API.Dtos
{
    public class AnswerDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Count { get; set; }
        public int QuestionId { get; set; }
        
    }
}