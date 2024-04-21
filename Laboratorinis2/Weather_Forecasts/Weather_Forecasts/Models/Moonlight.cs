namespace Weather_Forecasts.Models;

public class Moonlight
{
    public int Id { get; set; }
    public TimeSpan MoonRise { get; set; }
    public TimeSpan MoonSet { get; set; }
    public string Phase { get; set; }
    public int DistanceToTheEarth { get; set; }
    public decimal Brightness { get; set; }
    public TimeSpan DurationInTheSky { get; set; }
    public string fk_WeatherForecastCode { get; set; }
    public DateTime fk_WeatherForecastDate { get; set; }
}