using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
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
    
    /// <summary>
    /// Finds a weather station by code
    /// </summary>
    /// <param name="code">Code to find</param>
    /// <returns>Weather station if successful</returns>
    [HttpGet("{code}")]
    public IActionResult FindWeatherStation(string code)
    {
        Console.WriteLine(DateTime.Now + " FindWeatherStation: got request.");
        var station = _weatherStationRepository.Find(code);
        if (station == null)
        {
            Console.WriteLine(DateTime.Now + " FindWeatherStation: Weather station " + code + " not found.");
            return NotFound("Weather station not found");
        }

        Console.WriteLine(DateTime.Now + " FindWeatherStation: Weather station " + code + " found.");
        
        return Ok(station);
    }
    
    /// <summary>
    /// Updates information about a weather station
    /// </summary>
    /// <param name="station">Updated weather station</param>
    /// <returns>Ok if successful</returns>
    [HttpPut("{code}")]
    public IActionResult UpdateWeatherStation([FromBody] WeatherStation station)
    {
        Console.WriteLine(DateTime.Now + " UpdateWeatherStation: got request.");
        try
        {
            _weatherStationRepository.Update(station);
            Console.WriteLine(DateTime.Now + " UpdateWeatherStation: Weather station updated successfully.");
            return Ok("Weather station updated successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(DateTime.Now + " UpdateWeatherStation: " + ex.Message);
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
    
    /// <summary>
    /// Inserts a new weather station
    /// </summary>
    /// <param name="station">Weather station to insert</param>
    /// <returns>Ok if successful</returns>
    [HttpPost("insert")]
    public IActionResult InsertWeatherStation([FromBody] WeatherStation station)
    {
        Console.WriteLine(DateTime.Now + " InsertWeatherStation: got request.");
        try
        {
            _weatherStationRepository.Insert(station);
            Console.WriteLine(DateTime.Now + " InsertWeatherStation: Weather station inserted successfully.");
            return Ok("Weather station inserted successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(DateTime.Now + " InsertWeatherStation: " + ex.Message);
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}