using AutoMapper;
using CommandsService.Data;
using CommandsService.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace CommandsService.Controllers
{   
    [Route("api/c/[controller]")]
    [ApiController]
    public class PlatformsController : ControllerBase 
    {
        private readonly ICommandRepo _repo;
        private readonly IMapper _mapper;

        public PlatformsController(ICommandRepo repo, IMapper mapper)
        {
           _repo = repo;
           _mapper = mapper;
        }

        [HttpGet]

        public ActionResult<IEnumerable<PlatformReadDto>> GetAllPlatforms()
        {   
            System.Console.WriteLine("--> Getting Platforms from CommandsService");
            var platforms = _repo.GetAllPlatforms();
            return Ok(_mapper.Map<IEnumerable<PlatformReadDto>>(platforms));
        }
        [HttpPost]
        public ActionResult TestInboundPost()
        {
            System.Console.WriteLine("---> Inbound post # Command Service");

            return Ok("Inbound test from platforms controller");
        }
    }
}   