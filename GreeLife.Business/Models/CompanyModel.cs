﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreeLife.Business.Models
{
    public class CompanyModel : Entity
    {
        public string Name { get; set; }
        public string Document { get; set; }
        public DateTime CreateDate { get; set; }
        public ICollection<EmployeeModel> Employees { get; set; }

    }
}
