using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("google")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenRequest request)
    {
        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken, new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { "927787589560-ng122o7dcitoj65o59hrg2hpnbl4b1ah.apps.googleusercontent.com" } // Your client ID
            });

            // Check if user already exists
            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                // Create a new Identity user
                user = new IdentityUser
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);
            }

            // Sign the user in
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new
            {
                message = "User signed in",
                email = user.Email,
                userId = user.Id
            });
        }
        catch (InvalidJwtException)
        {
            return Unauthorized("Invalid Google token");
        }
    }
}

public class GoogleTokenRequest
{
    public string IdToken { get; set; }
}
