namespace Weather_Forecasts.Models;

public class OperationalStatus
{
    public int Id { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime? DateTo { get; set; }
    public bool Status { get; set; }
    public string fk_WeatherStationCode { get; set; }
}