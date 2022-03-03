using System.Threading.Tasks;
using API.Dtos;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
            ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){

            if(await UserExists(registerDto.Username)) BadRequest("The username is already taken. Please choose other one");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var createResult = await _userManager.CreateAsync(user, registerDto.Password);

            if(!createResult.Succeeded) return BadRequest(createResult.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if(!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new UserDto{
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };


        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if(!await UserExists(loginDto.Username)) return Unauthorized("Invalid credentials");

            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized();

            return new UserDto{
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };

        }

        private async Task<bool> UserExists(string username){
            
            return await _userManager.Users.AnyAsync(u => u.UserName == username.ToLower());
        }


    }
}