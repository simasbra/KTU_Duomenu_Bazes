using Microsoft.Extensions.Logging.Abstractions;
using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class WeatherStationRepository
{
	/// <summary>
	/// Gets weather stations table from the database
	/// </summary>
	/// <returns>Weather stations table</returns>
    public List<WeatherStation> GetTable()
    {
        var query = $@"SELECT * FROM `{Config.TblPrefix}Weather_Stations` ORDER BY Code ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<WeatherStation>(drc, (dre, e) =>
        {
            e.Code = dre.From<string>("Code");
            e.ManagingOrganization = dre.From<string>("Managing_organization");
            e.Latitude = dre.From<decimal>("Latitude");
            e.Longitude = dre.From<decimal>("Longitude");
            e.Elevation = dre.From<int>("Elevation");
            e.Type = dre.From<string>("Type");
            e.fk_CityName = dre.From<string>("fk_CityName");
            e.fk_CityCountry = dre.From<string>("fk_CityCountry");
        });

        return result;
    }

    /// <summary>
    /// Gets a list of weather stations and cities from the database
    /// </summary>
    /// <returns>List of weather stations and cities</returns>
    public List<WeatherStationList> GetList()
    {
	    var query = $@"SELECT
			station.Code,
			station.Managing_organization,
			station.Type,
			city.Name AS CityName,
			city.Country AS CityCountry,
			city.Time_zone AS TimeZone,
			status.Status AS OperationalStatus
			FROM `{Config.TblPrefix}Weather_Stations` station
				LEFT JOIN `{Config.TblPrefix}Cities` city ON city.Name = station.fk_CityName AND city.Country = station.fk_CityCountry
        		LEFT JOIN `{Config.TblPrefix}Operational_Statuses` status ON status.fk_Weather_StationCode = station.Code
			ORDER BY station.Code ASC";
	    var drc = Sql.Query(query);

	    var result = Sql.MapAll<WeatherStationList>(drc, (dre, e) =>
	    {
		    e.Code = dre.From<string>("Code");
		    e.ManagingOrganization = dre.From<string>("Managing_organization");
		    e.Type = dre.From<string>("Type");
		    e.CityName = dre.From<string>("CityName");
		    e.CityCountry = dre.From<string>("CityCountry");
		    e.TimeZone = dre.From<int>("TimeZone");
		    e.OperationalStatus = dre.From<bool>("OperationalStatus");
	    });

	    return result;
    }

    /// <summary>
    /// Updates a weather station in the database
    /// </summary>
    /// <param name="station">Updated Weather station</param>
    public void Update(WeatherStation station)
    {
	    var query = $@"UPDATE `{Config.TblPrefix}Weather_Stations`
			SET
				Managing_organization=?managingOrganization,
				Latitude=?latitude,
				Longitude=?longitude,
				Elevation=?elevation,
				Type=?type,
				fk_CityName=?fk_CityName,
				fk_CityCountry=?fk_CityCountry
			WHERE
				Code=?code";
	    
	    Sql.Update(query, args =>
	    {
		    args.Add("?managingOrganization", station.ManagingOrganization);
		    args.Add("?latitude", station.Latitude);
		    args.Add("?longitude", station.Longitude);
		    args.Add("?elevation", station.Elevation);
		    args.Add("?type", station.Type);
		    args.Add("?fk_CityName", station.fk_CityName);
		    args.Add("?fk_CityCountry", station.fk_CityCountry);
		    args.Add("?code", station.Code);
	    });
	}
    
    /// <summary>
    /// Deletes a weather station from the database by code
    /// </summary>
    /// <param name="code">Weather Station code</param>
    public void Delete(string code)
	{
	    var query = $@"DELETE FROM `{Config.TblPrefix}Weather_Stations` WHERE Code=?code";
	    Sql.Delete(query, args =>
	    {
		    args.Add("?code", code);
	    });
	}

    /// <summary>
    /// Finds a weather station in the database by code
    /// </summary>
    /// <param name="code">Code to find</param>
    /// <returns>Weather Station if found</returns>
	public WeatherStation Find(string code)
	{
		var query = $@"SELECT * FROM `{Config.TblPrefix}Weather_Stations` WHERE Code=?code";
		
		var drc = Sql.Query(query, args =>
		{
			args.Add("?code", code);
		});

		if (drc.Count > 0)
		{
			var result = Sql.MapOne<WeatherStation>(drc, (dre, e) =>
			{
				e.Code = dre.From<string>("Code");
				e.ManagingOrganization = dre.From<string>("Managing_organization");
				e.Latitude = dre.From<decimal>("Latitude");
				e.Longitude = dre.From<decimal>("Longitude");
				e.Elevation = dre.From<int>("Elevation");
				e.Type = dre.From<string>("Type");
				e.fk_CityCountry = dre.From<string>("fk_CityCountry");
				e.fk_CityName = dre.From<string>("fk_CityName");
			});
			
			return result;
		}

		return null;
	}

    /// <summary>
    /// Inserts a weather station into the database
    /// </summary>
    /// <param name="station">Weather station to insert</param>
	public void Insert(WeatherStation station)
	{
		var query = $@"INSERT INTO `{Config.TblPrefix}Weather_Stations`
		(Code, Managing_organization, Latitude, Longitude, Elevation, Type, fk_CityName, fk_CityCountry)
		VALUES
		(?code, ?managingOrganization, ?latitude, ?longitude, ?elevation, ?type, ?fk_CityName, ?fk_CityCountry)";

		Sql.Insert(query, args =>
		{
			args.Add("?code", station.Code);
			args.Add("?managingOrganization", station.ManagingOrganization);
			args.Add("?latitude", station.Latitude);
			args.Add("?longitude", station.Longitude);
			args.Add("?elevation", station.Elevation);
			args.Add("?type", station.Type);
			args.Add("?fk_CityName", station.fk_CityName);
			args.Add("?fk_CityCountry", station.fk_CityCountry);
		});
	}
}