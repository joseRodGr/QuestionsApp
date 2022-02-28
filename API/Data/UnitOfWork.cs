using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private IQuestionRepository _questionRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public IQuestionRepository QuestionRepository
        {
            get
            {

                if (_questionRepository == null)
                {
                    _questionRepository = new QuestionRepository(_context, _mapper);
                }

                return _questionRepository;
            }
        }



        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}