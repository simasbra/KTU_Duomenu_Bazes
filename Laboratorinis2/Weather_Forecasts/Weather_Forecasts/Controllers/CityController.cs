using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CityController : ControllerBase
{
    private readonly CityRepository _cityRepository;

    public CityController()
    {
        _cityRepository = new CityRepository();
    }

    [HttpGet]
    public IActionResult GetCities()
    {
        Console.WriteLine(DateTime.Now + " Received request for cities");
        var cities = _cityRepository.GetList();
        if (cities == null || cities.Count == 0)
        {
            return NotFound("No cities found.");
        }

        return Ok(cities);
    }
}