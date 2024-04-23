using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class WeatherForecastRepository
{
    public List<WeatherForecast> GetList()
    {
        var query = "SELECT * FROM `Weather_Forecasts` ORDER BY Date DESC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<WeatherForecast>(drc, (dre, e) =>
        {
            e.Code = dre.From<string>("Code");
            e.Date = dre.From<DateTime>("Date");
            e.Source = dre.From<string>("Source");
            e.Confidence = dre.From<decimal>("Confidence");
            e.fk_CityName = dre.From<string>("fk_CityName");
            e.fk_CityCountry = dre.From<string>("fk_CityCountry");
            e.fk_WeatherStationCode = dre.From<string>("fk_Weather_StationCode");
        });

        return result;
    }
}
