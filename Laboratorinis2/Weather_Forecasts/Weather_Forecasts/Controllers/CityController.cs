using Microsoft.AspNetCore.Mvc;
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

    // [HttpGet]
    // public ActionResult Delete(string name, string country)
    // {
    //     var city = _cityRepository.Find(name, country);
    //     if (city == null)
    //     {
    //         return NotFound("City not found.");
    //     }
    //
    //     return Ok(city);
    // }

    
    [HttpPost]
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