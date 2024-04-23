using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class SunlightRepository
{
    public List<Sunlight> GetList()
    {
        var query = "SELECT * FROM `Sunlight` ORDER BY id_Sunlight ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Sunlight>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Sunlight");
            e.Sunrise = dre.From<TimeSpan>("Sunrise");
            e.Sunset = dre.From<TimeSpan>("Sunset");
            e.DaylightDuration = dre.From<TimeSpan>("Daylight_duration");
            e.UVIndexValue = dre.From<int>("UV_index_value");
            e.UVRadiationIntensity = dre.From<int>("UV_radiation_intensity");
            e.fk_WeatherForecastCode = dre.From<string>("fk_Weather_ForecastCode");
            e.fk_WeatherForecastDate = dre.From<DateTime>("fk_Weather_ForecastDate");
        });

        return result;
    }
}