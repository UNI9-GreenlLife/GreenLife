using GreenLife.Business.Models;
using GreenLife.Data.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GreenLife.Server.Configuration
{
    public static class IdentityConfig
    {
        public static IServiceCollection AddIdentityConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            // Configuração do DbContext para Identity
            services.AddDbContext<IdentityApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Configuração do Identity
            services.AddIdentity<ApplicationUser, IdentityRole<int>>()
                .AddRoles<IdentityRole<int>>()
                .AddEntityFrameworkStores<IdentityApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configuração do JWT
            var appSettingsSection = configuration.GetSection("IdentitySettings");
            services.Configure<IdentitySettingsModel>(appSettingsSection);

            var identitySettings = appSettingsSection.Get<IdentitySettingsModel>();
            var key = Encoding.ASCII.GetBytes(identitySettings.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = identitySettings.ValidIn,
                    ValidIssuer = identitySettings.Sender,
                };
            });

            return services;
        }

    }
}
