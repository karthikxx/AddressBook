﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AddressBook.Api.Filters;

namespace AddressBook.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();

            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Filters.Add(new ValidateModelAttribute());
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
