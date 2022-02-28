using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser: IdentityUser<int>
    {
        public ICollection<Question> QuestionsCreated { get; set; }
        public ICollection<UserQuestion> QUestionsUsers { get; set; }
        public ICollection<AppUserRole> UsersRoles { get; set; }
    }
}