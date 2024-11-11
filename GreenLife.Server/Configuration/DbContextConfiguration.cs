﻿using GreenLife.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace GreenLife.Server.Configuration
{
    public static class DbContextConfiguration
    {
        public static void DbContextConfig(this IServiceCollection services, IConfiguration configuration)
        {

                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString("defaultConnection")));

        }
    }
}