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
			station.Latitude,
			station.Longitude,
			station.Elevation,
			station.Type,
			city.Name AS CityName,
			city.Country AS CityCountry,
			city.Time_zone AS TimeZone
			FROM
				`{Config.TblPrefix}Weather_Stations` station
				LEFT JOIN `{Config.TblPrefix}Cities` city ON city.Name = station.fk_CityName AND city.Country = station.fk_CityCountry
			ORDER BY station.Code ASC";
	    var drc = Sql.Query(query);

	    var result = Sql.MapAll<WeatherStationList>(drc, (dre, e) =>
	    {
		    e.Code = dre.From<string>("Code");
		    e.ManagingOrganization = dre.From<string>("Managing_organization");
		    e.Latitude = dre.From<decimal>("Latitude");
		    e.Longitude = dre.From<decimal>("Longitude");
		    e.Elevation = dre.From<int>("Elevation");
		    e.Type = dre.From<string>("Type");
		    e.CityName = dre.From<string>("CityName");
		    e.CityCountry = dre.From<string>("CityCountry");
		    e.TimeZone = dre.From<int>("TimeZone");
	    });

	    return result;
    }

    public void Update(WeatherStation station)
    {
	    
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
}