using Microsoft.AspNetCore.Mvc;
using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class OperationalStatusesRepository
{
    /// <summary>
    /// Gets a list of all operational statuses from the database
    /// </summary>
    /// <returns>List of operational statuses</returns>
    public List<OperationalStatus> GetList()
    {
        var query = $"SELECT * FROM `{Config.TblPrefix}Operational_Statuses` ORDER BY id_Operational_Status ASC";
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

    /// <summary>
    /// Find an operational status by weather station code in the database
    /// </summary>
    /// <param name="code">Code to find</param>
    /// <returns></returns>
    public OperationalStatus Find(string code)
    {
        var query = $"SELECT * FROM `{Config.TblPrefix}Operational_Statuses` WHERE fk_Weather_StationCode = ?code";
        var drc = Sql.Query(query, args =>
        {
            args.Add("?code", code);
        });

        if (drc.Count > 0)
        {
            var result = Sql.MapOne<OperationalStatus>(drc, (dre, e) =>
            {
                e.Id = dre.From<int>("id_Operational_Status");
                e.DateFrom = dre.From<DateTime>("Date_from");
                e.DateTo = dre.From<DateTime?>("Date_to") == DateTime.MinValue ? null : dre.From<DateTime?>("Date_to");
                e.Status = dre.From<bool>("Status");
                e.fk_WeatherStationCode = dre.From<string>("fk_Weather_StationCode");
            });
            
            return result;
        }

        return null;
    }

    /// <summary>
    /// Checks if the given date is the default minimum value.
    /// </summary>
    /// <param name="date">The date to check.</param>
    /// <returns>True if it is the minimum date, false otherwise.</returns>
    private bool IsDefaultDate(DateTime date)
    {
        return date == DateTime.MinValue;
    }
}