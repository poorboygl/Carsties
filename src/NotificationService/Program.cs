using MassTransit;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMassTransit(x => {

    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("nt", false));

    x.UsingRabbitMq((context,cfg) => {
        cfg.ConfigureEndpoints(context);
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", h =>
        {
            h.Username(builder.Configuration.GetValue("RabbitMq:Username","rabbitmq")!); 
            h.Password(builder.Configuration.GetValue("RabbitMq:Password","rabbitmqpw")!);
        });
    });
});

var app = builder.Build();
app.Run();
