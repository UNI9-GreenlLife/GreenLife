using GreeLife.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Business.Interfaces
{
    public interface IEmployeeRepository : IRepository<EmployeeModel>
    {
        Task<IEnumerable<EmployeeModel>> GetEmployeesByCompanyId(int companyId);
    }
}
