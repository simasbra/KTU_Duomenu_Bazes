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

public class TemperatureReportList
{
    // TimeStamp
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }

    // City
    public string City { get; set; }

    // WeatherStation
    public string StationCode { get; set; }

    // OperationalStatus
    public DateTime OperationalFrom { get; set; }
    public DateTime OperationalUntil { get; set; }

    // WeatherForecast
    public string ForecastCode { get; set; }
    public decimal Confidence { get; set; }

    // Temperature
    public decimal Temperature { get; set; }
    public int FeelsLike { get; set; }

    public decimal AvgTempThisDay { get; set; }
    public decimal MaxTempThisDay { get; set; }
    public decimal MinTempThisDay { get; set; }
    public int TempRecordCount { get; set; }
}

public class TemperatureReport
{
    public string City { get; set; }
    
    public List<WeatherStation> WeatherStations { get; set; }
    
    public class WeatherStation
    {
        public string Code { get; set; }
        public List<WeatherForecast> Forecasts { get; set; }
        public OperationalStatus OperationalStatus { get; set; }
    }
    
    public class WeatherForecast
    {
        public string Code { get; set; }
        public decimal Confidence { get; set; }
        public List<TimeStamp> TimeStamps { get; set; }
        public AgregatedTemperature AgregatedTemperature { get; set; }
    }

    public class OperationalStatus
    {
        public DateTime OperationalFrom { get; set; }
        public DateTime OperationalUntil { get; set; }
    }
    
    public class TimeStamp
    {
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public List<Temperature> Temperatures { get; set; }
    }

    public class Temperature
    {
        public decimal Average { get; set; }
        public int FeelsLike { get; set; }
    }

    public class AgregatedTemperature
    {
        public decimal AvgTempThisDay { get; set; }
        public decimal MaxTempThisDay { get; set; }
        public decimal MinTempThisDay { get; set; }
        public int TempRecordCount { get; set; }

    }
}