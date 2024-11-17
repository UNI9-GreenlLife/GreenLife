using System.ComponentModel.DataAnnotations;

namespace GreenLife.Server.DTO
{
    public class RegisterApplicationUserViewModel
    {
        [Required]
        [StringLength(50, MinimumLength = 5)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, ErrorMessage = "Field musth have between {2} and {1} characters", MinimumLength = 5)]

        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Password are no equal,")]
        public string ConfirmPassword { get; set; }

        [Required]
        public int CompanyId { get; set; }
    }


    public class LoginApplicationUserViewModel
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, ErrorMessage = "Field musth have between {2} and {1} characters", MinimumLength = 5)]

        public string Password { get; set; }
    }
}
