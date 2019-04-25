using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using moamma_identity.Models;
using IdentityServer4.Services;
using moamma_identity.Servcies;

namespace moamma_identity
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
            services.AddIdentity<Author, IdentityRole>()
                .AddEntityFrameworkStores<AdministrationContext>()
                .AddDefaultTokenProviders();
            services.ConfigureApplicationCookie(opts =>
            {
                opts.Cookie.HttpOnly = true;
                opts.SlidingExpiration = true;
                opts.Cookie.Expiration = TimeSpan.FromHours(8);
                opts.ExpireTimeSpan = TimeSpan.FromMinutes(10);
                opts.LoginPath = "/account/login";
                opts.LogoutPath = "/account/logout";
            });
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryClients(Config.GetClients())
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddAspNetIdentity<Author>();
            services.AddTransient<IProfileService, IdentityClaimsProfileService>();
            services.AddCors(options =>
                                options
                                .AddPolicy("AllowAll", p =>
                                    p.AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()));
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseCors("AllowAll");
            app.UseIdentityServer();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Account}/{action=Login}/{id?}"
                );
            });
        }
    }
}
