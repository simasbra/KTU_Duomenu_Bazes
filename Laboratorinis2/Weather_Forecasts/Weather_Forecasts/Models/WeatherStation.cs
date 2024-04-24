namespace Weather_Forecasts.Models;

public class WeatherStation
{
    public string Code { get; set; }
    public string ManagingOrganization { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int Elevation { get; set; }
    public string Type { get; set; }
    public string fk_CityName { get; set; }
    public string fk_CityCountry { get; set; }
}

public class WeatherStationList
{
    public string Code { get; set; }
    public string ManagingOrganization { get; set; }
    public string Type { get; set; }
    public string CityName { get; set; }
    public string CityCountry { get; set; }
    public int TimeZone { get; set; }
    public bool OperationalStatus { get; set; }
}