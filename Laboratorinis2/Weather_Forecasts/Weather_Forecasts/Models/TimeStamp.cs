namespace Weather_Forecasts.Models;

public class TimeStamp
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string fk_WeatherForecastCode { get; set; }
    public DateTime fk_WeatherForecastDate { get; set; }
}