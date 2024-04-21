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