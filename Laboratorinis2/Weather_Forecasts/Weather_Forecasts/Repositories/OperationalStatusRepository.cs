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
    /// Updates an operational status in the database
    /// </summary>
    /// <param name="status">Updated operational status</param>
    public void Update(OperationalStatus status)
    {
        var query = $@"UPDATE `{Config.TblPrefix}Operational_Statuses`
            SET 
                Date_from=?dateFrom,
                Date_to=?dateTo,
                Status=?status
            
            WHERE 
                fk_Weather_StationCode=?code";
        
        Sql.Update(query, args =>
        {
            args.Add("?dateFrom", status.DateFrom);
            args.Add("?dateTo", status.DateTo);
            args.Add("?status", status.Status);
            args.Add("?code", status.fk_WeatherStationCode);
        });
    }

    /// <summary>
    /// Inserts an operational status into the database
    /// </summary>
    /// <param name="status">Operational status to insert</param>
    public void Insert(OperationalStatus status)
    {
        var query = status.DateTo == null
            ? $@"INSERT INTO `{Config.TblPrefix}Operational_Statuses`
            (
                 Date_from,
                 Status,
                 fk_Weather_StationCode
             )
            VALUES
            (
                 ?dateFrom,
                 ?status,
                 ?code
             )"
            : $@"INSERT INTO `{Config.TblPrefix}Operational_Statuses`
            (
                 Date_from,
                 Date_to,
                 Status,
                 fk_Weather_StationCode
             )
            VALUES
            (
                 ?dateFrom,
                 ?dateTo,
                 ?status,
                 ?code
             )";

        Sql.Insert(query, args =>
        {
            args.Add("?dateFrom", status.DateFrom);
            if (status.DateTo != null)
            {
                args.Add("?dateTo", status.DateTo);
            }

            args.Add("?status", status.Status);
            args.Add("?code", status.fk_WeatherStationCode);
        });
    }
}