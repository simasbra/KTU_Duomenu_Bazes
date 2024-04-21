namespace Weather_Forecasts.Models;

public class Pressure
{
    public int Id { get; set; }
    public int AverageHPa { get; set; }
    public int MaximumHPa { get; set; }
    public int MinimumHPa { get; set; }
    public decimal Humidity { get; set; }
    public decimal DewPoint { get; set; }
    public int fk_TimeStampId { get; set; }
}