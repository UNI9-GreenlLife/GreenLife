using FluentValidation;
using GreeLife.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Validations
{
    public class EmployeeValidation : AbstractValidator<EmployeeModel>
    {
        public EmployeeValidation()
        {
            RuleFor(e => e.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(3, 50).WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(e => e.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(e => e.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.")
                .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Invalid phone number format.");

            RuleFor(e => e.Position)
                .NotEmpty().WithMessage("Position is required.")
                .Length(2, 50).WithMessage("Position must be between 2 and 50 characters.");


            RuleFor(e => e.Salary)
                .GreaterThan(0).WithMessage("Salary must be greater than 0.")
                .LessThanOrEqualTo(1_000_000).WithMessage("Salary must not exceed 1,000,000.");

            RuleFor(e => e.CompanyId)
                .GreaterThan(0).WithMessage("CompanyId must be a positive number.");

        }
    }
}
