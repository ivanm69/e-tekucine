﻿using Backend.Models;
using Microsoft.OpenApi.Models;
using System.Reflection;


namespace Backend.Extensions
{
    public static class TekucineExtensions
    {

        public static void AddTekucineSwaggerGen(this IServiceCollection Services)
        {
            // prilagodba za dokumentaciju, čitati https://medium.com/geekculture/customizing-swagger-in-asp-net-core-5-2c98d03cbe52

            Services.AddSwaggerGen(sgo =>
            { // sgo je instanca klase SwaggerGenOptions
              // čitati https://devintxcontent.blob.core.windows.net/showcontent/Speaker%20Presentations%20Fall%202017/Web%20API%20Best%20Practices.pdf
                var o = new OpenApiInfo()
                {
                    Title = "E-tekućine API",
                    Version = "v1",
                    Contact = new OpenApiContact()
                    {
                        Email = "ivanmarosevic4@gmail.com",
                        Name = "Ivan Marošević"
                    },
                    Description = "Ovo je dokumentacija za E-tekućine API",
                    License = new OpenApiLicense()
                    {
                        Name = "Edukacijska licenca"
                    }
                };
                sgo.SwaggerDoc("v1", o);

                // SECURITY

                sgo.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Autorizacija radi tako da se prvo na ruti /api/v1/Autorizacija/token.  
                      autorizirate i dobijete token (bez navodnika). Upišite 'Bearer' [razmak] i dobiveni token.
                      Primjer: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTc3MTc2MjksImV4cCI6MTY5Nzc0NjQyOSwiaWF0IjoxNjk3NzE3NjI5fQ.PN7YPayllTrWESc6mdyp3XCQ1wp3FfDLZmka6_dAJsY'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                sgo.AddSecurityRequirement(new OpenApiSecurityRequirement()
                  {
                    {
                      new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                          {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                          },
                          Scheme = "oauth2",
                          Name = "Bearer",
                          In = ParameterLocation.Header,

                        },
                        new List<string>()
                      }
                    });

                // END SECURITY


                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                sgo.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

            });

        }


        public static void AddTekucineCORS(this IServiceCollection Services)
        {
            // Svi se od svuda na sve moguće načine mogu spojitina naš API
            // Čitati https://code-maze.com/aspnetcore-webapi-best-practices/

            Services.AddCors(opcije =>
            {
                opcije.AddPolicy("CorsPolicy",
                    builder =>
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                );

            });

        }
    }
}
