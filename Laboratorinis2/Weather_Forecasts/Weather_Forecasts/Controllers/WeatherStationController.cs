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
        Console.WriteLine(DateTime.Now + " GetWeatherStationsTable called.");
        var stations = _weatherStationRepository.GetTable();
        if (stations == null || stations.Count == 0)
        {
            return NotFound("No weather stations found");
        }

        return Ok(stations);
    }

    /// <summary>
    /// Gets a list of all weather stations
    /// </summary>
    /// <returns>Weather stations if found</returns>
    [HttpGet]
    public IActionResult GetWeatherStationsList()
    {
        Console.WriteLine(DateTime.Now + " GetWeatherStationsTable called.");
        var stations = _weatherStationRepository.GetTable();
        if (stations == null || stations.Count == 0)
        {
            return NotFound("No weather stations found");
        }

        return Ok(stations);
    }
}