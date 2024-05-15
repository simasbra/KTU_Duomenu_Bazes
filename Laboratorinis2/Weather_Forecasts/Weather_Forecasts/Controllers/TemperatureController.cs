using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TemperatureController : ControllerBase
{
    /// <summary>
    /// Temperatures repository
    /// </summary>
    private readonly TemperaturesRepository _weatherStationRepository;

    /// <summary>
    /// Temperature controller constructor
    /// </summary>
    public TemperatureController()
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
        Console.WriteLine(DateTime.Now + " GetTemperatureReportList: got request.");
        var temperatures = _weatherStationRepository.GetFilteredList(city, dateFrom, dateTo, confidence);
        
        if (temperatures == null || temperatures.Count == 0)
        {
            Console.WriteLine(DateTime.Now + " GetTemperatureReportList: No temperatures found.");
            return NotFound("No temperatures found");
        }

        Console.WriteLine(DateTime.Now + " GetTemperatureReportList: " + temperatures.Count + " temperatures found.");
        
        return Ok(temperatures);
    }

    /// <summary>
    /// Gets a hierarchical temperature report
    /// </summary>
    /// <param name="city">City to filter</param>
    /// <param name="dateFrom">Date from to filter</param>
    /// <param name="dateTo">Date to to filter</param>
    /// <param name="confidence">Confidence to filter</param>
    /// <returns>Hierarchical temperature report</returns>
    [HttpGet("report/object/city={city}&dateFrom={dateFrom}&dateTo={dateTo}&confidence={confidence}")]
    public IActionResult GetTemperatureReportObject(string city, DateTime dateFrom, DateTime dateTo, int confidence)
    {
        Console.WriteLine(DateTime.Now + " GetTemperatureReportObject: got request.");
        var temperatures = _weatherStationRepository.GetFilteredList(city, dateFrom, dateTo, confidence);

        if (temperatures == null || temperatures.Count == 0)
        {
            Console.WriteLine(DateTime.Now + " GetTemperatureReportObject: No temperatures found.");
            return NotFound("No temperatures found");
        }

        Console.WriteLine(DateTime.Now + " GetTemperatureReportObject: " + temperatures.Count + " temperatures found.");

        var service = new TemperatureReportService();
        var hierarchicalList = service.GetHierarchicalTemperatureReport(temperatures);
        
        return Ok(hierarchicalList);
    }
}