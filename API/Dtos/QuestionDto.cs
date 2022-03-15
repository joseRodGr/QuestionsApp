using System.Collections.Generic;
using API.Models;

namespace API.Dtos
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatorUsername { get; set; }
        public bool OpenQuestion { get; set; }
        public bool Shared { get; set; }
        public ICollection<AnswerDto> Answers { get; set; }
    }
}