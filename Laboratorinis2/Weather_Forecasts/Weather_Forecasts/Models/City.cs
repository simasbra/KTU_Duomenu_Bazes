namespace Weather_Forecasts.Models;

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
    public DateTime FoundingDate { get; set; }
    public int TimeZone { get; set; }
}