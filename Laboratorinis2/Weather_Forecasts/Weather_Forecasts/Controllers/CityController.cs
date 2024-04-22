using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("[controller]")]
public class CitiesController : ControllerBase
{
    private readonly CityRepository _cityRepository;

    public CitiesController()
    {
        _cityRepository = new CityRepository();
    }

    [HttpGet]
    public IActionResult GetCities()
    {
        return Ok(_cityRepository.GetList());
    }
}