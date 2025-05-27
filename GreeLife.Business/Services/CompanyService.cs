using GreeLife.Business.Models;
using GreenLife.Business.Interfaces;
using GreenLife.Business.Interfaces.Services;
using GreenLife.Business.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Services
{
    public class CompanyService : BaseService, ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;

        public CompanyService(INotificator notificator, ICompanyRepository companyRepository)
            : base(notificator)
        {
            _companyRepository = companyRepository;
        }

        public async Task Adicionar(CompanyModel company)
        {
            if (!ExecutarValidacao(new CompanyValidation(), company))
                return;

            await _companyRepository.Create(company);
        }

        public async Task Atualizar(CompanyModel company)
        {
            if (!ExecutarValidacao(new CompanyValidation(), company))
                return;

            if (_companyRepository.Search(c => c.Id == company.Id).Result.Any())
            {
                Notificar("Company Id not found");
                return;
            }

            await _companyRepository.Update(company);
        }

        public void Dispose()
        {
            _companyRepository?.Dispose();
        }
    }
}
