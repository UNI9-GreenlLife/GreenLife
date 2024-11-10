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

        //foreignkey
        public int ComapanyId{ get; set; }
    }
}
