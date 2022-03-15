using System.Collections.Generic;

namespace API.Dtos
{
    public class QuestionReceivedDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatorUsername { get; set; }
        public bool OpenQuestion { get; set; }
        public bool hasAnswered { get; set; }
        public ICollection<AnswerReceivedDto> Answers { get; set; }
    }
}