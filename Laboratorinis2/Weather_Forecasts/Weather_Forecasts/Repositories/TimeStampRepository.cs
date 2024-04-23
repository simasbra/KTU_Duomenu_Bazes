using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class TimeStampsRepository
{
    public List<TimeStamp> GetList()
    {
        var query = "SELECT * FROM `Time_Stamps` ORDER BY id_Time_Stamp ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<TimeStamp>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Time_Stamp");
            e.Date = dre.From<DateTime>("Date");
            e.Time = dre.From<TimeSpan>("Time");
            e.fk_WeatherForecastCode = dre.From<string>("fk_Weather_ForecastCode");
            e.fk_WeatherForecastDate = dre.From<DateTime>("fk_Weather_ForecastDate");
        });

        return result;
    }
}