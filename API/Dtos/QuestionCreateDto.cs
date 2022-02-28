using System.Collections.Generic;

namespace API.Dtos
{
    public class QuestionCreateDto
    {
        public string Content { get; set; }
        public ICollection<AnswerCreateDto> Answers { get; set; }
    }
}