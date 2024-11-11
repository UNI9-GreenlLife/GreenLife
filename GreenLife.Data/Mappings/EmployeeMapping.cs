using GreeLife.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Data.Mappings
{
    public class EmployeeMapping : IEntityTypeConfiguration<EmployeeModel>
    {
        public void Configure(EntityTypeBuilder<EmployeeModel> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(x => x.PhoneNumber)
                .IsRequired()
                .HasColumnType("varchar(20)");

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnType("varchar(50)");

            builder.Property(x => x.Position)
                .IsRequired()
                .HasColumnType("varchar(30)");

            builder.Property(x => x.Salary)
                .IsRequired();

            // Relacionamento 1:N com VacationModel
            builder.HasMany(e => e.Vacations)
                   .WithOne(v => v.Employee)
                   .HasForeignKey(v => v.EmployeeId)    
                   .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
