using GreenLife.Business.Interfaces;
using GreenLife.Business.Interfaces.Services;
using GreenLife.Business.Notifications;
using GreenLife.Business.Services;
using GreenLife.Data.Repository;

namespace GreenLife.Server.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {

            services.AddScoped<IVacationRepository, VacationRepository>();
            services.AddScoped<INotificator, Notificator>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();

            return services;
        }
    }
}
