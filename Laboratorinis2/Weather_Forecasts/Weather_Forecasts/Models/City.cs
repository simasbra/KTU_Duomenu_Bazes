using System.ComponentModel.DataAnnotations;

namespace Weather_Forecasts.Models;

/// <summary>
/// City model
/// </summary>
public class City
{
    public string Name { get; set; }
    public string Country { get; set; }
    public int Population { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int Elevation { get; set; }
    public decimal AverageAnnualTemperature { get; set; }
    public int AverageAnnualPrecipitation { get; set; }

    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
    public DateTime FoundingDate { get; set; }
    public int TimeZone { get; set; }
}