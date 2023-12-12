using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.MiddleWare
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        // this method has to be called InvokeAsync
        public async Task InvokeAsync(HttpContext context)
        {
            try{
                // call the next middleware in the pipeline
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                /* Create an AppException object to encapsulate the error details.
                 If is in development, include the message and stackTrace, otherwise just display
                 Internal Server Error */
                var response = _env.IsDevelopment() ? new AppException(context.Response.StatusCode,
                                                                            ex.Message,ex.StackTrace?.ToString())
                                                    : new AppException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                // Write the JSON response to the HTTP response stream
                await context.Response.WriteAsync(json);
            }
        }
    }
}