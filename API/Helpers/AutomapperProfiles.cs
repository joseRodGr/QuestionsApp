using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<Question, QuestionDto>()
                .ForMember(dest => dest.CreatorUsername, opt => {
                    opt.MapFrom(src => src.Creator.UserName);
                });
            CreateMap<QuestionDto, Question>();
            CreateMap<QuestionCreateDto, Question>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AnswerDto, Answer>();
            CreateMap<Answer, AnswerDto>();
            CreateMap<AnswerCreateDto, Answer>();
        }
    }
}