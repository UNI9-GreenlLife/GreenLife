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
    public class VacationMapping : IEntityTypeConfiguration<VacationModel>
    {
        public void Configure(EntityTypeBuilder<VacationModel> builder)
        {
            builder.HasKey(v => v.Id);

            builder.Property(v => v.StartDate)
                   .IsRequired();

            builder.Property(v => v.EndDate)
                   .IsRequired();

        }
    }
}
