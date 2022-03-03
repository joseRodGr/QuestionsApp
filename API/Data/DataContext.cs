using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext: IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }
        
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<UserQuestion> UserQuestions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){

            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(u => u.UsersRoles)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(r => r.UsersRoles)
                .WithOne(r => r.Role)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            builder.Entity<UserQuestion>()
                .HasKey(k => new{k.UserId, k.QuestionId});
            // builder.Entity<UserQuestion>()
            //     .HasIndex(k => new{k.UserId, k.QuestionId});

            // builder.Entity<UserQuestion>()
            //     .HasAlternateKey(k => new{k.UserId, k.QuestionId});

            // builder.Entity<AppUser>()
            //     .HasMany(u => u.QuestionsUsers)
            //     .WithOne(u => u.User)
            //     .HasForeignKey(u => u.UserId)
            //     .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Question>()
                .HasMany(q => q.QuestionsUsers)
                .WithOne(q => q.Question)
                .HasForeignKey(q => q.QuestionId)
                .OnDelete(DeleteBehavior.ClientCascade);       
        }
        
    }
    
}