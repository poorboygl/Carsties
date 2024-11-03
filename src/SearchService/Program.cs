using System.Net;
using MassTransit;
using MongoDB.Driver;
using MongoDB.Entities;
using Polly;
using Polly.Extensions.Http;
using SearchService.Consumers;
using SearchService.Data;
using SearchService.Models;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(x => {

    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    x.SetEndpointNameFormatter(new  KebabCaseEndpointNameFormatter("search", false));
    x.UsingRabbitMq((context,cfg) => {
        cfg.ReceiveEndpoint("search-auction-created", e => {
            e.UseMessageRetry( r => r.Interval(5, 5));
            e.ConfigureConsumer<AuctionCreatedConsumer>(context);
        });
        cfg.ConfigureEndpoints(context);
        // cfg.Host("192.168.50.2", "/", h =>
        // {
        //     h.Username("rabbitmq"); 
        //     h.Password("rabbitmqpw");
        // });
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", h =>
        {
            h.Username(builder.Configuration.GetValue("RabbitMq:Username","rabbitmq")!); 
            h.Password(builder.Configuration.GetValue("RabbitMq:Password","rabbitmqpw")!);
        });

    });
});

builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Lifetime.ApplicationStarted.Register(async () => {
    try
    {
        await DbInitializer.InitDb(app);
    }
    catch (Exception e)
    {
        
        Console.WriteLine(e);
    }

});


app.Run();

static IAsyncPolicy<HttpResponseMessage> GetPolicy()
        =>  HttpPolicyExtensions
                .HandleTransientHttpError()
                .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
                .WaitAndRetryForeverAsync( _ => TimeSpan.FromSeconds(3));
