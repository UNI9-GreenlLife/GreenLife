using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreeLife.Business.Models
{
    public class EmployeeModel: Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        public double Salary { get; set; }

        // Foreign key para Company
        public int CompanyId { get; set; }
        public CompanyModel Company { get; set; }

        // Propriedade de navegação para a relação "um para muitos" com Vacation
        public ICollection<VacationModel> Vacations { get; set; }
    }
}
