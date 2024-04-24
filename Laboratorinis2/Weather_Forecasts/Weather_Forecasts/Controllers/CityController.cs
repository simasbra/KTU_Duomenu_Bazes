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
        Console.WriteLine(DateTime.Now + " GetCities: got request.");
        var cities = _cityRepository.GetList();
        if (cities == null || cities.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetCities: No cities found.");
            return NotFound("No cities found.");
        }
        
        Console.WriteLine(DateTime.Now + " GetCities: " + cities.Count + " cities found.");
        
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
        Console.WriteLine(DateTime.Now + " UpdateCity: got request.");
        try
        {
            _cityRepository.Update(city);
            Console.WriteLine(DateTime.Now + " UpdateCity: City updated successfully.");
            return Ok("City updated successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(DateTime.Now + " UpdateCity: " + ex.Message);
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
        Console.WriteLine(DateTime.Now + " DeleteCity: got request.");
        try
        {
            _cityRepository.Delete(name, country);
            Console.WriteLine(DateTime.Now + " DeleteCity: City deleted successfully.");
            return Ok("City deleted successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(DateTime.Now + " DeleteCity: " + ex.Message);
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
        Console.WriteLine(DateTime.Now + " AddCity: got request.");
        try
        {
            _cityRepository.Insert(city);
            Console.WriteLine(DateTime.Now + " AddCity: City added successfully.");
            return Ok("City added successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine(DateTime.Now + " AddCity: " + ex.Message);
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    /// <summary>
    /// Finds a city by name and country
    /// </summary>
    /// <param name="name">Name to find</param>
    /// <param name="country">Country to find</param>
    /// <returns>City if successful</returns>
    [HttpGet("{name}/{country}")]
    public IActionResult FindCity(string name, string country)
    {
        Console.WriteLine(DateTime.Now + " FindCity: got request.");
        var city = _cityRepository.Find(name, country);
        if (city == null)
        {
            Console.WriteLine(DateTime.Now + " FindCity: City " + name + " not found.");
            return NotFound("City not found");
        }

        Console.WriteLine(DateTime.Now + " FindCity: City " + name + " found.");
        
        return Ok(city);
    }
}