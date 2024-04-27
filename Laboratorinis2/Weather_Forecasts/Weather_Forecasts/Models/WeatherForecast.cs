namespace Weather_Forecasts.Models;

public class WeatherForecast
{
    public string Code { get; set; }
    public DateTime Date { get; set; }
    public string Source { get; set; }
    public decimal Confidence { get; set; }
    public string fk_CityName { get; set; }
    public string fk_CityCountry { get; set; }
    public string fk_WeatherStationCode { get; set; }
}

public class WeatherForecastList
{
    public string Code { get; set; }
    public DateTime Date { get; set; }
    public string Source { get; set; }
    public decimal Confidence { get; set; }
    public string CityName { get; set; }
    public string WeatherStationCode { get; set; }
}