using System.Collections.Generic;

namespace API.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool OpenQuestion { get; set; } = true;
        public bool Shared { get; set; } = false;
        public int CreatorId { get; set; }
        public AppUser Creator { get; set; }
        public ICollection<Answer> Answers { get; set; }
        public ICollection<UserQuestion> QUestionsUsers { get; set; }

    }
}