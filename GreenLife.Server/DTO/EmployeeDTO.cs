﻿using GreeLife.Business.Models;
using System.ComponentModel.DataAnnotations;

namespace GreenLife.Server.DTO
{
    public class EmployeeDTO
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        public double Salary { get; set; }

        // Foreign key para Company
        public int CompanyId { get; set; }
    }
}
