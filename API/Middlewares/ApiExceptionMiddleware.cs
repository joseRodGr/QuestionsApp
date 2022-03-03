using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middlewares
{
    public class ApiExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ApiExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        
        public ApiExceptionMiddleware(RequestDelegate next, ILogger<ApiExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context){

            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var ApiError = _env.IsDevelopment() ?
                    new ApiExceptionError(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) :
                    new ApiExceptionError(context.Response.StatusCode, "Internal server error");

                //Serialize the response
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var jsonApiError = JsonSerializer.Serialize(ApiError, options);

                await context.Response.WriteAsync(jsonApiError);

            }
        }

    }
}