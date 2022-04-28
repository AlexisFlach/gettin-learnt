using System.Text.Json;
using AutoMapper;
using CommandsService.Data;
using CommandsService.Dtos;
using CommandsService.Models;

namespace CommandsService.EventProcessing
{
    public class EventProcessor : IEventProcessor
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IMapper _mapper;

        public EventProcessor(IServiceScopeFactory scopeFactory, IMapper mapper)
        {
            _scopeFactory = scopeFactory;
            _mapper = mapper;
        }
        public void ProcessEvent(string msg)
        {
            var eventType = DetermineEvent(msg);

            switch(eventType)
            {
                case EventType.PlatformPublished:
                    AddPlatform(msg);
                    break;
                default:
                    break;
            }
        }

        private EventType DetermineEvent(string notificationMsg)
        {
            System.Console.WriteLine("--> Determening event");
            var eventType = JsonSerializer.Deserialize<GenericEventDto>(notificationMsg);
            switch(eventType.Event)
            {
                case "Platform_Published":
                    System.Console.WriteLine("--> Platform Published Event Detected");
                    return EventType.PlatformPublished;
                default:
                    System.Console.WriteLine("--> Could not determine event type");
                    return EventType.Undetermined;
            }
        }

        private void AddPlatform(string platformPublishedMsg)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var repo = scope.ServiceProvider.GetRequiredService<ICommandRepo>();

                var platformPublishedDto = JsonSerializer.Deserialize<PlaformPublishedDto>(platformPublishedMsg);

                try {
                    var plat = _mapper.Map<Platform>(platformPublishedDto);
                    if(!repo.ExternalPlatformExists(plat.ExternalID))
                    {
                        repo.CreatePlatform(plat);
                        repo.SaveChanges();
                        System.Console.WriteLine("-->Platform added to db");
                    }
                    else
                    {
                        System.Console.WriteLine("--> Platform already exists");
                    }
                } 
                catch(Exception ex)
                {
                    System.Console.WriteLine($"--> Could not add platform to db, {ex.Message}");
                }
            }
        }
    }

    enum EventType {
        PlatformPublished,
        Undetermined
    }
}