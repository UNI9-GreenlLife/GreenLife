using GreenLife.Business.Interfaces;
using GreenLife.Business.Models;
using GreenLife.Server.Configuration;
using GreenLife.Server.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GreenLife.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AuthController : MainController
    {

        private readonly SignInManager<ApplicationUser> _sigInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICompanyRepository _companyRepository;
        private readonly IdentitySettingsModel _identitySettingsModel;

        public AuthController(INotificator notificator, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ICompanyRepository companyRepository, IOptions<IdentitySettingsModel> identitySettingsModel) : base(notificator)

        {
            _companyRepository = companyRepository;
            _userManager = userManager;
            _sigInManager = signInManager;
            _identitySettingsModel = identitySettingsModel.Value;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterApplicationUserViewModel registerUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            if (!_companyRepository.Search(c => c.Id == registerUser.CompanyId).Result.Any())
            {
                NotificarErro("Company id not found.");
                return CustomResponse(registerUser);
            }

            var user = new ApplicationUser()
            {
                Name = registerUser.Name,
                UserName = registerUser.Email,
                Email = registerUser.Email,
                EmailConfirmed = true,
                CompanyId = registerUser.CompanyId,
            };

            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (result.Succeeded)
            {
                await _sigInManager.SignInAsync(user, isPersistent: false);
                return CustomResponse(await JwtGen(user.Email));
            }
            foreach (var error in result.Errors)
            {
                NotificarErro(error.Description);
            }

            return CustomResponse(registerUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginApplicationUserViewModel loginUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var result = await _sigInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, isPersistent: false, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                return CustomResponse(await JwtGen(loginUser.Email));
            }

            if (result.IsLockedOut)
            {
                NotificarErro("User is temporarily blocked due to multiple failed attempts");
                return CustomResponse(loginUser);
            }

            NotificarErro("User or Password invalid");
            return CustomResponse(loginUser);
        }


        private async Task<string> JwtGen(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var claims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            claims.Add(new Claim(type: JwtRegisteredClaimNames.Sub, value: user.Id.ToString()));
            claims.Add(new Claim(type: JwtRegisteredClaimNames.Email, value: user.Email));
            claims.Add(new Claim(type: JwtRegisteredClaimNames.Nbf, value: ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(type: JwtRegisteredClaimNames.Iat, value: ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));
            foreach (var userRole in roles)
            {
                claims.Add(new Claim(type: "role", value: userRole));
            }

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            var tokenHandler = new JwtSecurityTokenHandler();
            Console.WriteLine(_identitySettingsModel.HourExpiration);

            var key = Encoding.ASCII.GetBytes(_identitySettingsModel.Secret);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _identitySettingsModel.Sender,
                Audience = _identitySettingsModel.ValidIn,
                Expires = DateTime.UtcNow.AddHours(_identitySettingsModel.HourExpiration),
                Subject = identityClaims,
                NotBefore = DateTime.UtcNow,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            });

            var encodedToken = tokenHandler.WriteToken(token);
            return encodedToken;
        }


        private static long ToUnixEpochDate(DateTime date)
            => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0, offset: TimeSpan.Zero)).TotalSeconds);
    }
}
