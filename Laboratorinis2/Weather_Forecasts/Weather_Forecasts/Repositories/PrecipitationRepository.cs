namespace Weather_Forecasts.Repositories;

using Weather_Forecasts.Models;

public class PrecipitationRepository
{
    public static List<Precipitation> GetList()
    {
        var query = "SELECT * FROM `Precipitations` ORDER BY id_Precipitation ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Precipitation>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Precipitation");
            e.Type = dre.From<string>("Type");
            e.AmountInMm = dre.From<int>("Amount_in_mm");
            e.Intensity = dre.From<string>("Intensity");
            e.Probability = dre.From<decimal>("Probability");
            e.Duration = dre.From<TimeSpan>("Duration");
            e.fk_TimeStampId = dre.From<int>("fk_Time_Stamp");
        });

        return result;
    }
}