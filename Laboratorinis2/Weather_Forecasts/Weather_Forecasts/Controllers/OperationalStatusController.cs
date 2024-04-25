using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;
using Weather_Forecasts.Repositories;

namespace Weather_Forecasts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OperationalStatusController : ControllerBase
{
    /// <summary>
    /// Operational status repository
    /// </summary>
    private readonly OperationalStatusesRepository _operationalStatusesRepository;
    
    /// <summary>
    /// Operational status controller constructor
    /// </summary>
    public OperationalStatusController()
    {
        _operationalStatusesRepository = new OperationalStatusesRepository();   
    }
    
    /// <summary>
    /// Gets a list of all operational statuses
    /// </summary>
    /// <returns>List of operational statuses</returns>
    [HttpGet]
    public IActionResult GetOperationalStatuses()
    {
        Console.WriteLine(DateTime.Now + " GetOperationalStatuses: got request.");
        var statuses = _operationalStatusesRepository.GetList();
        if (statuses == null || statuses.Count == 0)
        {
            Console.WriteLine(DateTime.Now + "GetOperationalStatuses: No operational statuses found.");
            return NotFound("No operational statuses found.");
        }
        
        Console.WriteLine(DateTime.Now + " GetOperationalStatuses: " + statuses.Count + " operational statuses found.");
        
        return Ok(statuses);
    }
    
    /// <summary>
    /// Finds an operational status by code
    /// </summary>
    /// <param name="code">Code to find</param>
    /// <returns>Operational status if successful</returns>
    [HttpGet("{code}")]
    public IActionResult FindOperationalStatus(string code)
    {
        Console.WriteLine(DateTime.Now + " FindOperationalStatus: got request.");
        var status = _operationalStatusesRepository.Find(code);
        
        if (status == null)
        {
            Console.WriteLine(DateTime.Now + " FindOperationalStatus: No operational status found for code " + code + ".");
            return NotFound("No operational status found for code " + code + ".");
        }
        
        Console.WriteLine(DateTime.Now + " FindOperationalStatus: Operational status found for code " + code + ".");
        
        return Ok(status);
    }
    
    /// <summary>
    /// Updates an operational status
    /// </summary>
    /// <param name="status">Updated operational status</param>
    /// <returns>Ok if successful</returns>
    [HttpPut("{code}")]
    public IActionResult UpdateOperationalStatus([FromBody] OperationalStatus status)
    {
        Console.WriteLine(DateTime.Now + " UpdateOperationalStatus: got request.");
        try
        {
            _operationalStatusesRepository.Update(status);
            Console.WriteLine(DateTime.Now + " UpdateOperationalStatus: Operational status updated.");
            return Ok("Operational status updated.");
        }
        catch (Exception e)
        {
            Console.WriteLine(DateTime.Now + " UpdateOperationalStatus: " + e.Message);
            return BadRequest(e.Message);
        }
    }
    
    /// <summary>
    /// Inserts an operational status
    /// </summary>
    /// <param name="status">Operational status to insert</param>
    /// <returns>Ok if successful</returns>
    [HttpPost("insert")]
    public IActionResult InsertOperationalStatus([FromBody] OperationalStatus status)
    {
        Console.WriteLine(DateTime.Now + " InsertOperationalStatus: got request.");
        try
        {
            _operationalStatusesRepository.Insert(status);
            Console.WriteLine(DateTime.Now + " InsertOperationalStatus: Operational status inserted.");
            return Ok("Operational status inserted.");
        }
        catch (Exception e)
        {
            Console.WriteLine(DateTime.Now + " InsertOperationalStatus: " + e.Message);
            return BadRequest(e.Message);
        }
    }
}