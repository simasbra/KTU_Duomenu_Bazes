using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class CloudinessRepository
{
    public List<Cloudiness> GetList()
    {
        var query = "SELECT * FROM `Cloudiness` ORDER BY id_Cloudiness DESC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Cloudiness>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Cloudiness");
            e.Percentage = dre.From<int>("Percentage");
            e.HighClouds = dre.From<int>("High_clouds");
            e.MiddleClouds = dre.From<int>("Middle_clouds");
            e.LowClouds = dre.From<int>("Low_clouds");
            e.Visibility = dre.From<int>("Visibility");
            e.FogPercentage = dre.From<int>("Fog_percentage");
            e.fk_TimeStampId = dre.From<int>("fk_Time_Stamp");
        });

        return result;
    }
}