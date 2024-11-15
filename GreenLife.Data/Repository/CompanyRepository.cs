using GreeLife.Business.Models;
using GreenLife.Business.Interfaces;
using GreenLife.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Data.Repository
{
    public class CompanyRepository : Repository<CompanyModel>, ICompanyRepository
    {
        public CompanyRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
