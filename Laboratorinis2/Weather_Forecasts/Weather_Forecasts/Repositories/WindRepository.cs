namespace Weather_Forecasts.Repositories;

using Weather_Forecasts.Models;

public class WindRepository
{
    public static List<Wind> GetList()
    {
        var query = "SELECT * FROM `Winds` ORDER BY id_Wind ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Wind>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Wind");
            e.Speed = dre.From<decimal>("Speed");
            e.Direction = dre.From<string>("Direction");
            e.GustSpeed = dre.From<decimal>("Gust_speed");
            e.Strength = dre.From<string>("Strength");
            e.fk_TimeStampId = dre.From<int>("fk_Time_Stamp");
        });

        return result;
    }
}