namespace Weather_Forecasts.Models;

public class Record
{
    public DateTime Date { get; set; }
    public string Location { get; set; }
    public decimal? MaximumTemperature { get; set; }
    public decimal? MinimumTemperature { get; set; }
    public int? MaximumPrecipitation { get; set; }
    public decimal? MaximumWindSpeed { get; set; }
    public string fk_WeatherForecastCode { get; set; }
    public DateTime fk_WeatherForecastDate { get; set; }
}