namespace Weather_Forecasts.Models;

public class Temperature
{
    public int Id { get; set; }
    public decimal Maximum { get; set; }
    public decimal Minimum { get; set; }
    public decimal Average { get; set; }
    public decimal FeelsLike { get; set; }
    public bool Fluctuations { get; set; }
    public int fk_TimeStampId { get; set; }
}

public class TemperatureList
{
    // Temperature
    public decimal AverageTemperature { get; set; }
    public decimal FeelsLike { get; set; }
    // TimeStamp
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    // City
    public string CityName { get; set; }
    public string CityCountry { get; set; }
    //WeatherForecast
    public string WeatherForecastCode { get; set; }
    public decimal WeatherForecastConfidence { get; set; }
    public string WeatherForecastSource { get; set; }
    // WeatherStation
    public string WeatherStationCode { get; set; }
    public string ManagingOrganization { get; set; }
}