using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherStationController : ControllerBase
{
    /// <summary>
    /// Weather station repository
    /// </summary>
    private readonly WeatherStationRepository _weatherStationRepository;

    /// <summary>
    /// Weather station controller constructor
    /// </summary>
    public WeatherStationController()
    {
        _weatherStationRepository = new WeatherStationRepository();
    }

    /// <summary>
    /// Gets weather stations table
    /// </summary>
    /// <returns>Weather stations if found</returns>
    [HttpGet("table")]
    public IActionResult GetWeatherStationsTable()
    {
        Console.WriteLine(DateTime.Now + " GetWeatherStationsTable: got request.");
        var stations = _weatherStationRepository.GetTable();
        if (stations == null || stations.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetWeatherStationsTable: No weather stations found.");
            return NotFound("No weather stations found");
        }

        Console.WriteLine(DateTime.Now + " GetWeatherStationsTable: " + stations.Count + " weather stations found.");
        
        return Ok(stations);
    }

    /// <summary>
    /// Gets a list of all weather stations
    /// </summary>
    /// <returns>Weather stations if found</returns>
    [HttpGet]
    public IActionResult GetWeatherStationsList()
    {
        Console.WriteLine(DateTime.Now + " GetWeatherStationsList: got request.");
        var stations = _weatherStationRepository.GetList();
        if (stations == null || stations.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetWeatherStationsList: No weather stations found.");
            return NotFound("No weather stations found");
        }

        Console.WriteLine(DateTime.Now + " GetWeatherStationsList: " + stations.Count + " weather stations found.");
        
        return Ok(stations);
    }

    /// <summary>
    /// Deletes a weather station by code
    /// </summary>
    /// <param name="code">Weather station code</param>
    /// <returns>Ok if successful</returns>
    [HttpDelete("{code}")]
    public IActionResult DeleteWeatherStation(string code)
    {
        Console.WriteLine(DateTime.Now + " DeleteWeatherStation: got request.");
        try
        {
            _weatherStationRepository.Delete(code);
            Console.WriteLine(DateTime.Now + " DeleteWeatherStation: Weather station deleted successfully.");
            return Ok("Weather station deleted successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(DateTime.Now + " DeleteWeatherStation: " + ex.Message);
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}