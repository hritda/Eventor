using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Controllers;
using Eventor.Database;
using Eventor.Helpers.UserHelperFunctions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Eventor.Extensions
{
    public static class ApplicationServices
    {
        public static  IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            
            services.AddDbContext<DataContext>(options => options.UseSqlite(@"DataSource=eventor.db;"));
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IEventRepository,EventRepository>();
            services.AddScoped<UserHelper>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = config["Jwt:Issuer"],
                    ValidAudience = config["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(config["Jwt:Key"]))

                };
            });
            services.AddMvc();
            return services ;
        }
    }
}