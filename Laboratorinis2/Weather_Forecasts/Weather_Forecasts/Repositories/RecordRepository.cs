using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class RecordRepository
{
    public List<Record> GetList()
    {
        var query = "SELECT * FROM `Records` ORDER BY Date ASC, Location ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Record>(drc, (dre, e) =>
        {
            e.Date = dre.From<DateTime>("Date");
            e.Location = dre.From<string>("Location");
            e.MaximumTemperature = dre.From<decimal?>("Maximum_temperature");
            e.MinimumTemperature = dre.From<decimal?>("Minimum_temperature");
            e.MaximumPrecipitation = dre.From<int?>("Maximum_precipitation");
            e.MaximumWindSpeed = dre.From<decimal?>("Maximum_wind_speed");
            e.fk_WeatherForecastCode = dre.From<string>("fk_Weather_ForecastCode");
            e.fk_WeatherForecastDate = dre.From<DateTime>("fk_Weather_ForecastDate");
        });

        return result;
    }
}