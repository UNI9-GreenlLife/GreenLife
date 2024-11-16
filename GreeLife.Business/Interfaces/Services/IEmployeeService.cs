using GreeLife.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Interfaces.Services
{
    public interface IEmployeeService : IDisposable
    {
        public Task Adicionar(EmployeeModel employee);
        public Task Atualizar(EmployeeModel employee);

    }
}
