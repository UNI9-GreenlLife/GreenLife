using GreenLife.Business.Interfaces;
using GreenLife.Data.Repository;

namespace GreenLife.Server.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();

            return services;
        }
    }
}
