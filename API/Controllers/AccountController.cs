using System;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using API.Dtos;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper, IMailService mailService, IConfiguration config)
        {
            _config = config;
            _mailService = mailService;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) BadRequest("The username is already taken. Please choose other one");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            using(var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled)){

                try{

                    var createResult = await _userManager.CreateAsync(user, registerDto.Password);
                    if (!createResult.Succeeded){
                        transaction.Dispose();
                        return BadRequest(createResult.Errors);
                    } 

                    var roleResult = await _userManager.AddToRoleAsync(user, "User");
                    if (!roleResult.Succeeded){
                        transaction.Dispose();
                        return BadRequest(roleResult.Errors);
                    } 
                    
                    transaction.Complete();

                }catch(Exception ex){
                    
                    transaction.Dispose();
                    throw ex;
                }

            }

            // create the confirmation token
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var tokenEncoded = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(confirmationToken));
            var callbackUrl = Url.Action("ConfirmEmail", "Account", new { id = user.Id.ToString(), token = tokenEncoded }, protocol: HttpContext.Request.Scheme);

            await _mailService.SendEmailAsync(user.Email, "VotingApp.com - Confirm your email",
                    $"<p>Please confirm your email by <a href='{callbackUrl}'>Clicking here</a></p>");

            return NoContent();

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (!await UserExists(loginDto.Username)) return Unauthorized("Invalid credentials");

            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalid credentials");

            if (!await _userManager.IsEmailConfirmedAsync(user)) return BadRequest("You need to confirm your email address");

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user)
            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(u => u.UserName == username.ToLower());
        }


        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string id, string token)
        {
            if (string.IsNullOrWhiteSpace(id) || string.IsNullOrWhiteSpace(token)) return NotFound();

            var user = await _userManager.FindByIdAsync(id);

            if (user.EmailConfirmed) return BadRequest("Your email is already confirm.");

            var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded) return BadRequest("Failed to confirm your email");

            return Redirect($"{_config["ApiUrl"]}/EmailConfirmed.html");
        }

        [HttpPost("forgot-password/{email}")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if(user == null) return NotFound("Email address not founded");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var validToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var url = $"{_config["ApiUrl"]}/ResetPassword?email={email}&token={validToken}";

            await _mailService.SendEmailAsync(user.Email, "Reset Password", "<h1>Follow the instructions to reset your password</h1>"
                + $"<p>To reset your password <a href={url}>Click here</a></p>");

            return NoContent();
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromForm]ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if(model.NewPassword != model.ConfirmPassword) return BadRequest("Passwords do not match");

            var validToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token));

            var result = await _userManager.ResetPasswordAsync(user,validToken, model.NewPassword);

            if(!result.Succeeded) return BadRequest("Failed to reset the password");

            return Redirect($"{_config["ApiUrl"]}/ResetSuccessfully.html");
        }


    }
}