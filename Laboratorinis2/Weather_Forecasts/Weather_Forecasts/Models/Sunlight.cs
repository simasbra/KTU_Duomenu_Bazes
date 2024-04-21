namespace Weather_Forecasts.Models;

public class Sunlight
{
    public int Id { get; set; }
    public TimeSpan Sunrise { get; set; }
    public TimeSpan Sunset { get; set; }
    public TimeSpan DaylightDuration { get; set; }
    public int UVIndexValue { get; set; }
    public int UVRadiationIntensity { get; set; }
    public string fk_WeatherForecastCode { get; set; }
    public DateTime fk_WeatherForecastDate { get; set; }
}