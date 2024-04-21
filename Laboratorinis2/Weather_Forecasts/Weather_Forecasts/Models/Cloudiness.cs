namespace Weather_Forecasts.Models;

public class Cloudiness
{
    public int Id { get; set; }
    public decimal Percentage { get; set; }
    public decimal HighClouds { get; set; }
    public decimal MiddleClouds { get; set; }
    public decimal LowClouds { get; set; }
    public decimal Visibility { get; set; }
    public decimal FogPercentage { get; set; }
    public int fk_TimeStampId { get; set; }
}