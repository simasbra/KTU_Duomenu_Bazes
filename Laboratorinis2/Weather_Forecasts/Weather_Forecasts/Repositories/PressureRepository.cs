using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class PressuresRepository
{
    public List<Pressure> GetList()
    {
        var query = "SELECT * FROM `Pressures` ORDER BY id_Pressure ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Pressure>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Pressure");
            e.AverageHPa = dre.From<int>("Average_hPa");
            e.MaximumHPa = dre.From<int>("Maximum_hPa");
            e.MinimumHPa = dre.From<int>("Minimum_hPa");
            e.Humidity = dre.From<decimal>("Humidity");
            e.DewPoint = dre.From<decimal>("Dew_Point");
            e.fk_TimeStampId = dre.From<int>("fk_Time_Stamp");
        });

        return result;
    }
}