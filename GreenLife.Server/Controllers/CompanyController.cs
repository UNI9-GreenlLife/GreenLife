using GreenLife.Business.Interfaces.Services;
using GreenLife.Business.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using GreeLife.Business.Models;
using AutoMapper;
using GreenLife.Server.DTO;

namespace GreenLife.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : MainController
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyService _companyService;
        private readonly IMapper _mapper;
        private readonly INotificator _notificator;
        public CompanyController(INotificator notificator, ICompanyRepository companyRepository,ICompanyService companyService, IMapper mapper) : base(notificator)
        {
            _companyRepository = companyRepository;
            _companyService = companyService;
            _mapper = mapper;
            _notificator = notificator;
        }

        [HttpPost]
        public async Task<ActionResult<CompanyDTO>> CreateCompany(CompanyDTO companyDTO)
        {
            var company = _mapper.Map<CompanyModel>(companyDTO);

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            Console.WriteLine(company);

            await _companyService.Adicionar(company);

            return CustomResponse(company);
        }
    }
}
