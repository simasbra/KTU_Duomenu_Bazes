namespace Weather_Forecasts.Models;

public class Precipitation
{
    public int Id { get; set; }
    public string Type { get; set; }
    public int AmountInMm { get; set; }
    public string Intensity { get; set; }
    public decimal Probability { get; set; }
    public TimeSpan Duration { get; set; }
    public int fk_TimeStampId { get; set; }
}