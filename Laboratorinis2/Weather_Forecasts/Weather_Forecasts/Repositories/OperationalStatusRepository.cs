namespace Weather_Forecasts.Repositories;

using Weather_Forecasts.Models;

public class OperationalStatusesRepository
{
    public List<OperationalStatus> GetList()
    {
        var query = "SELECT * FROM `Operational_Statuses` ORDER BY id_Operational_Status ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<OperationalStatus>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Operational_Status");
            e.DateFrom = dre.From<DateTime>("Date_from");
            e.DateTo = dre.From<DateTime?>("Date_to");
            e.Status = dre.From<bool>("Status");
            e.fk_WeatherStationCode = dre.From<string>("fk_Weather_StationCode");
        });

        return result;
    }
}