using AutoMapper;
using GreenLife.Business.Interfaces.Services;
using GreenLife.Business.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GreeLife.Business.Models;
using GreenLife.Server.DTO;

namespace GreenLife.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : MainController
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        private readonly INotificator _notificator;
        public EmployeeController(INotificator notificator, IEmployeeRepository employeeRepository, IEmployeeService employeeService, IMapper mapper) : base(notificator)
        {
            _employeeRepository = employeeRepository;
            _employeeService = employeeService;
            _mapper = mapper;
            _notificator = notificator;
        }

        // consulta todos os funcionarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetAllEmployees(int companyId)
        {
            var employees = await _employeeRepository.GetEmployeesByCompanyId(companyId);
            var employeeDTOs = _mapper.Map<IEnumerable<EmployeeDTO>>(employees);
            return CustomResponse(employeeDTOs);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> Insert(EmployeeDTO employeeDTO)
        {
            var employee = _mapper.Map<EmployeeModel>(employeeDTO);

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _employeeService.Adicionar(employee);

            return CustomResponse(employee);
        }
    }
}
