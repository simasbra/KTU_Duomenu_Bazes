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
        Console.WriteLine(DateTime.Now + " GetCities called.");
        var cities = _cityRepository.GetList();
        if (cities == null || cities.Count == 0)
        {
            return NotFound("No cities found.");
        }

        return Ok(cities);
    }
    
    [HttpPut("{name}/{country}")]
    public IActionResult UpdateCity([FromBody] City city)
    {
        Console.WriteLine(DateTime.Now + " UpdateCity called.");
        try
        {
            _cityRepository.Update(city);
            return Ok("City updated successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    [HttpDelete("{name}/{country}")]
    public IActionResult DeleteCity(string name, string country)

    {
        Console.WriteLine(DateTime.Now + " DeleteCity called.");
        try
        {
            _cityRepository.Delete(name, country);
            return Ok("City deleted successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}