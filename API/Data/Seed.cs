using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsersAndRolesAsync(UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager)
        {
            
            if(await userManager.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/SeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            if(users == null) return;

            var roles = new List<AppRole>{

                new AppRole{ Name = "Admin"},
                new AppRole{ Name = "Moderator"},
                new AppRole{ Name = "User"}
            };

            foreach(var role in roles){

                await roleManager.CreateAsync(role);
            }

            foreach(var user in users){

                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "User");
            }

            var adminUser = new AppUser{
                UserName = "admin"   
            };

            await userManager.CreateAsync(adminUser, "Pa$$w0rd");
            await userManager.AddToRolesAsync(adminUser, new[] {"Admin", "Moderator"});

        }
    }
}