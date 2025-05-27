using GreeLife.Business.Models;
using GreenLife.Business.Interfaces;
using GreenLife.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Data.Repository
{
    public class EmployeeRepository : Repository<EmployeeModel>, IEmployeeRepository
    {

        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {  
        }
        public async Task<IEnumerable<EmployeeModel>> GetEmployeesByCompanyId(int companyId)
        {
            return await _ctx.Employees.AsNoTracking()
                .Where(e => e.CompanyId == companyId)
                .ToListAsync();
                
        }
    }
}
