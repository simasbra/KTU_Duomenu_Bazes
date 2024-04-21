namespace Weather_Forecasts.Models;

public class Wind
{
    public int Id { get; set; }
    public decimal Speed { get; set; }
    public string Direction { get; set; }
    public decimal GustSpeed { get; set; }
    public string Strength { get; set; }
    public int fk_TimeStampId { get; set; }
}