namespace Weather_Forecasts.Repositories;

using Weather_Forecasts.Models;

public class MoonlightRepository
{
    public List<Moonlight> GetList()
    {
        var query = "SELECT * FROM `Moonlights` ORDER BY id_Sunglight DESC";
        var drc = Sql.Query(query);
        
        var result = Sql.MapAll<Moonlight>(drc, (dre, e) =>
            {
            e.Id = dre.From<int>("id_Sunglight");
            e.MoonRise = dre.From<TimeSpan>("MoonRise");
            e.MoonSet = dre.From<TimeSpan>("MoonSet");
            e.Phase = dre.From<string>("Phase");
            e.DistanceToTheEarth = dre.From<int>("Distance_to_the_Earth");
            e.Brightness = dre.From<decimal>("Brightness");
            e.DurationInTheSky = dre.From<TimeSpan>("Duration_in_the_sky");
            e.fk_WeatherForecastCode = dre.From<string>("fk_Weather_ForecastCode");
            e.fk_WeatherForecastDate = dre.From<DateTime>("fk_Weather_ForecastDate");
        });

        return result;
    }
}