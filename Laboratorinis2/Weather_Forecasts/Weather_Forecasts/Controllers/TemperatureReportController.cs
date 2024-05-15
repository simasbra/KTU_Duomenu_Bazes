using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TemperatureReportController : ControllerBase
{
    /// <summary>
    /// Temperatures repository
    /// </summary>
    private readonly TemperaturesRepository _weatherStationRepository;

    /// <summary>
    /// Temperature report controller constructor
    /// </summary>
    public TemperatureReportController()
    {
        _weatherStationRepository = new TemperaturesRepository();
    }
    
    /// <summary>
    /// Gets a temperature report list
    /// </summary>
    /// <param name="city">City to filter</param>
    /// <param name="dateFrom">Date from to filter</param>
    /// <param name="dateTo">Date to to filter</param>
    /// <param name="confidence">Confidence to filter</param>
    /// <returns>Temperature report as list</returns>
    [HttpGet("report/list/city={city}&dateFrom={dateFrom}&dateTo={dateTo}&confidence={confidence}")]
    public IActionResult GetTemperatureReportList(string city, DateTime dateFrom, DateTime dateTo, int confidence)
    {
        Console.WriteLine(DateTime.Now + " GetTemperatureReport: got request.");
        var temperatures = _weatherStationRepository.GetFilteredList(city, dateFrom, dateTo, confidence);
        
        if (temperatures == null || temperatures.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetTemperatureReport: No temperatures found.");
            return NotFound("No temperatures found");
        }

        Console.WriteLine(DateTime.Now + " GetTemperatureReport: " + temperatures.Count + " temperatures found.");
        
        return Ok(temperatures);
    }
    
}