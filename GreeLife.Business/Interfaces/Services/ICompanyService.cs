using GreeLife.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Interfaces.Services
{
    public interface ICompanyService : IDisposable
    {
        public Task Adicionar(CompanyModel company);
        public Task Atualizar(CompanyModel company);
    }
}
