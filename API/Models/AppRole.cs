using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppRole: IdentityRole<int>
    {
        public ICollection<AppUserRole> UsersRoles { get; set; }
    }
}