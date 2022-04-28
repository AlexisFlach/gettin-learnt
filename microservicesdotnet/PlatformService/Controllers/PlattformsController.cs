using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlatformService.AsyncDataServices;
using PlatformService.Data;
using PlatformService.Dtos;
using PlatformService.Models;
using PlatformService.SyncDataServices.Http;

namespace PlatformService.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformsController : ControllerBase
    {   
        private readonly IPlatformRepo _repo;
        private readonly IMapper _mapper;
        private readonly ICommandDataClient _commandDataClient;
        private readonly IMessageBusClient _messageBusClient;


        public PlatformsController(
        IPlatformRepo repo,
        IMapper mapper,
        ICommandDataClient commandDataClient,
        IMessageBusClient messageBusClient
        )
        {
            _repo = repo;
            _mapper = mapper;
            _commandDataClient = commandDataClient;
            _messageBusClient = messageBusClient;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PlatformReadDto>> GetPlatorms()
        {
            var platformItem = _repo.GetPlatforms();
            return Ok(_mapper.Map<IEnumerable<PlatformReadDto>>(platformItem));
        }
        [HttpGet("{id}", Name = "GetPlatform")]
        public ActionResult<PlatformReadDto> GetPlatform(int id)
        {
            var platformItem = _repo.GetPlatform(id);
            if (platformItem != null)
            {
                return Ok(_mapper.Map<PlatformReadDto>(platformItem));
            }
            return NotFound();
        }

        [HttpPost]

        public async Task<ActionResult<PlatformReadDto>> CreatePlatform(PlatformCreateDto platform)
        {
            var platformModel = _mapper.Map<Platform>(platform);
            _repo.CreatePlatform(platformModel);
            _repo.SaveChanges();

            var platformReadDto = _mapper.Map<PlatformReadDto>(platformModel);

            // Send Sync Message
            try
            {   
                System.Console.WriteLine("Sending sync message");
                 await _commandDataClient.SendPlatformToCommand(platformReadDto);
            }
            catch (System.Exception ex)
            {
                
                System.Console.WriteLine($"---> Could not send sync . {ex.Message}");
            }

            //Send async message

            try
            {
                var platformPublishedDto = _mapper.Map<PlatformPublishedDto>(platformReadDto);
                platformPublishedDto.Event = "Platform_Published";
                _messageBusClient.PublishNewPlatform(platformPublishedDto);
            }
            catch (System.Exception ex)
            {
                
                System.Console.WriteLine($"---> Could not send async . {ex.Message}");
            }

            return CreatedAtRoute(nameof(GetPlatform), new {Id = platformReadDto.Id}, platformReadDto ); 
        }
    }
}