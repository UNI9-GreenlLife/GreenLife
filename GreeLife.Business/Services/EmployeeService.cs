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
    public class EmployeeService : BaseService, IEmployeeService
    {

        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(INotificator notificator, IEmployeeRepository employeeRepository) : base(notificator)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task Adicionar(EmployeeModel employee)
        {
            if (!ExecutarValidacao(new EmployeeValidation(), employee)) return;

            _employeeRepository.Create(employee);
        }

        public async Task Atualizar(EmployeeModel employee)
        {
            if (!ExecutarValidacao(new EmployeeValidation(), employee)) return;

            if (_employeeRepository.Search(e => e.Id == employee.Id).Result.Any())
            {
                Notificar("Employee not found.");
                return;
            }
            _employeeRepository.Update(employee);
        }

        public void Dispose()
        {
            _employeeRepository?.Dispose();
        }
    }
}
