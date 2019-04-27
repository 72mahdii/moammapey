using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using moamma_api.Models;

namespace moamma_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AdministrationContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:Author:ConnectionString"]));
            services.AddDbContext<StorageContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:Storage:ConnectionString"]));
            services.AddIdentity<Author, IdentityRole>()
                .AddEntityFrameworkStores<AdministrationContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                            JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme =
                            JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = "http://localhost:5000";
                o.Audience = "resourceapi";
                o.RequireHttpsMetadata = false;
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiReader",
                        policy =>
                            policy.RequireClaim(
                                "scope", "api.read"));
                options.AddPolicy("Consumer",
                        policy =>
                            policy.RequireClaim(
                                ClaimTypes.Role, "consumer"));
                options.AddPolicy("moamma_spa",
                    policy =>
                        policy.RequireClaim("scope", "api.read"));
            });
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthentication();

            app.UseMvc();

        }
    }
}
