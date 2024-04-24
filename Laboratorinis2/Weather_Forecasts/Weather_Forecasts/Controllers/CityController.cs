using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CityController : ControllerBase
{
    /// <summary>
    /// City repository
    /// </summary>
    private readonly CityRepository _cityRepository;

    /// <summary>
    /// City controller constructor
    /// </summary>
    public CityController()
    {
        _cityRepository = new CityRepository();
    }

    /// <summary>
    /// Gets a list of all cities
    /// </summary>
    /// <returns>Cities if found</returns>
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
    
    /// <summary>
    /// Updates information about a city
    /// </summary>
    /// <param name="city">Updated city information</param>
    /// <returns>Ok if successful</returns>
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

    /// <summary>
    /// Deletes a city by name and country
    /// </summary>
    /// <param name="name">City name</param>
    /// <param name="country">City country</param>
    /// <returns>Ok if successful</returns>
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

    /// <summary>
    /// Adds a new city
    /// </summary>
    /// <param name="city">New city to add</param>
    /// <returns>Ok if successful</returns>
    [HttpPost]
    public IActionResult AddCity([FromBody] City city)
    {
        Console.WriteLine(DateTime.Now + " AddCity called.");
        try
        {
            _cityRepository.Insert(city);
            return Ok("City added successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}