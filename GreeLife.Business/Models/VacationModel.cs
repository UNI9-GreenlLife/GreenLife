using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreeLife.Business.Models
{
    public class VacationModel : Entity
    {
        public int EmployeeId { get; set; }
        public EmployeeModel Employee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
