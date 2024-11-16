using AutoMapper;
using GreeLife.Business.Models;
using GreenLife.Server.DTO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GreenLife.Server.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<CompanyDTO, CompanyModel>()
                    /*.ForMember(dest => dest.Employees, opt => opt.Ignore())*/.ReverseMap(); // Ignorar se não for necessário no mapeamento
                                                                                              //.ForMember(dest => dest.ApplicationUsers, opt => opt.Ignore()); // Ignorar também se não necessário

            CreateMap<EmployeeModel, EmployeeDTO>().ReverseMap();
            CreateMap<EmployeeModel, EmployeeInsertDTO>().ReverseMap();



        }
    }
}
