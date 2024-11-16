using FluentValidation;
using GreeLife.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Validations
{
    public class CompanyValidation : AbstractValidator<CompanyModel>
    {
        public CompanyValidation()
        {
            RuleFor(c => c.Name)
                    .NotEmpty().WithMessage("Company has to be a name.")
                    .Length(3, 50).WithMessage("Company's name must be between 3 and 50 characters.");

            RuleFor(c => c.Document.Length).Equal(CnpjValidacao.TamanhoCnpj)
                .WithMessage("Field must have {ComparisonValue} characters, only {PropertyValue} was given.");

            RuleFor(owner => CnpjValidacao.Validar(owner.Document)).Equal(true)
                                        .WithMessage("Documento is invalid.");


        }
    }
}
