using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class TemperaturesRepository
{
    public List<Temperature> GetList()
    {
        var query = "SELECT * FROM `Temperatures` ORDER BY id_Temperature ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Temperature>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Temperature");
            e.Maximum = dre.From<decimal>("Maximum");
            e.Minimum = dre.From<decimal>("Minimum");
            e.Average = dre.From<decimal>("Average");
            e.FeelsLike = dre.From<decimal>("Feels_like");
            e.Fluctuations = dre.From<bool>("Fluctuations");
            e.fk_TimeStampId = dre.From<int>("fk_Time_Stamp");
        });

        return result;
    }
}