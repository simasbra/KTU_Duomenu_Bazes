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
    
    [HttpGet("report/city={city}&dateFrom={dateFrom}&dateTo={dateTo}&confidence={confidence}")]
    public IActionResult GetTemperatureReport(string city, DateTime dateFrom, DateTime DateTo, int confidence)
    {
        Console.WriteLine(DateTime.Now + " GetTemperatureReport: got request.");
        var temperatures = _weatherStationRepository.GetList();
        
        if (temperatures == null || temperatures.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetTemperatureReport: No temperatures found.");
            return NotFound("No temperatures found");
        }

        Console.WriteLine(DateTime.Now + " GetTemperatureReport: " + temperatures.Count + " temperatures found.");
        
        return Ok(temperatures);
    }
    
}