using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    /// <summary>
    /// Weather forecast repository
    /// </summary>
    private readonly  WeatherForecastRepository _weatherForecastRepository;

    /// <summary>
    /// Weather forecast controller constructor
    /// </summary>
    public WeatherForecastController()
    {
        _weatherForecastRepository = new WeatherForecastRepository();
    }

    /// <summary>
    /// Gets weather forecasts table
    /// </summary>
    /// <returns>Weather forecasts if successful</returns>
    [HttpGet("table")]
    public IActionResult GetWeatherForecastsTable()
    {
        Console.WriteLine(DateTime.Now + " GetWeatherForecastsTable: got request.");
        var forecasts = _weatherForecastRepository.GetTable();
        
        if (forecasts == null || forecasts.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetWeatherForecastsTable: No weather forecasts found.");
        return NotFound("No weather forecasts found");
        }

        Console.WriteLine(DateTime.Now + " GetWeatherForecastsTable: " + forecasts.Count + " weather forecasts found.");

        return Ok(forecasts);
    }

    /// <summary>
    /// Gets weather forecasts list
    /// </summary>
    /// <returns>Weather forecasts if successful</returns>
    [HttpGet("list")]
    public IActionResult GetWeatherForecastsList()
    {
        Console.WriteLine(DateTime.Now + " GetWeatherForecastsList: got request.");
        var forecasts = _weatherForecastRepository.GetList();
        
        if (forecasts == null || forecasts.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetWeatherForecastsList: No weather forecasts found.");
            return NotFound("No weather forecasts found");
        }

        Console.WriteLine(DateTime.Now + " GetWeatherForecastsList: " + forecasts.Count + " weather forecasts found.");

        return Ok(forecasts);
    }

    /// <summary>
    /// Finds a weather forecast by code
    /// </summary>
    /// <param name="code">Code to find</param>
    /// <returns>Weather forecast if found</returns>
    [HttpGet("{code}")]
    public IActionResult FindWeatherForecast(string code)
    {
        Console.WriteLine(DateTime.Now + " FindWeatherForecast: got request.");
        var forecast = _weatherForecastRepository.Find(code);

        if (forecast == null)
        {
            Console.WriteLine(DateTime.Now + "FindWeatherForecast: No weather forecast found.");
            return NotFound("No weather forecast found");
        }

        Console.WriteLine(DateTime.Now + " FindWeatherForecast: Weather forecast found.");

        return Ok(forecast);
    }

    /// <summary>
    /// Adds a new weather forecast
    /// </summary>
    /// <param name="forecast">Forecast to add</param>
    /// <returns>Ok if successful</returns>
    [HttpPost("insert")]
    public IActionResult InsertWeatherForecast(WeatherForecast forecast)
    {
        Console.WriteLine(DateTime.Now + " AddWeatherForecast: got request.");
        try
        {
            _weatherForecastRepository.Insert(forecast);
            Console.WriteLine(DateTime.Now + " AddWeatherForecast: Weather forecast added.");
            
            return Ok("Weather forecast added");
        }
        catch (Exception e)
        {
            Console.WriteLine(DateTime.Now + " AddWeatherForecast: Error adding weather forecast: " + e.Message);
            
            return BadRequest("Error adding weather forecast");
        }
    }
}