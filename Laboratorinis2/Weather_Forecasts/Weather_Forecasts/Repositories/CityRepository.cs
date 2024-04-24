using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class CityRepository
{
    /// <summary>
    /// Gets a list of all cities from the database
    /// </summary>
    /// <returns>List of all cities</returns>
    public List<City> GetList()
    {
        var query = $@"SELECT * FROM `{Config.TblPrefix}Cities` ORDER BY Name ASC";
        var drc = Sql.Query(query);
        
        var result = Sql.MapAll<City>(drc, (dre, e) =>
        {
            e.Name = dre.From<string>("Name");
            e.Country = dre.From<string>("Country");
            e.Population = dre.From<int>("Population");
            e.Latitude = dre.From<decimal>("Latitude");
            e.Longitude = dre.From<decimal>("Longitude");
            e.Elevation = dre.From<int>("Elevation");
            e.AverageAnnualTemperature = dre.From<decimal>("Average_annual_temperature");
            e.AverageAnnualPrecipitation = dre.From<int>("Average_annual_precipitation");
            e.FoundingDate = dre.From<DateTime>("Founding_date");
            e.TimeZone = dre.From<int>("Time_zone");
        });
    
        return result;
    }

    /// <summary>
    /// Updates a city in the database
    /// </summary>
    /// <param name="city">City to update</param>
    public void Update(City city)
    {
        var query =
            $@"UPDATE `{Config.TblPrefix}Cities`
			SET 
			    Population=?population,
			    Latitude=?latitude,
			    Longitude=?longitude,
			    Elevation=?elevation,
			    Average_annual_temperature=?averageAnnualTemperature,
			    Average_annual_precipitation=?averageAnnualPrecipitation,
			    Founding_date=?foundingDate,
			    Time_zone=?timeZone
			WHERE 
				Name=?name AND Country=?country";

        Sql.Update(query, args =>
        {
            args.Add("?name", city.Name);
            args.Add("?country", city.Country);
            args.Add("?population", city.Population);
            args.Add("?latitude", city.Latitude);
            args.Add("?longitude", city.Longitude);
            args.Add("?elevation", city.Elevation);
            args.Add("?averageAnnualTemperature", city.AverageAnnualTemperature);
            args.Add("?averageAnnualPrecipitation", city.AverageAnnualPrecipitation);
            args.Add("?foundingDate", city.FoundingDate);
            args.Add("?timeZone", city.TimeZone);
        });
    }

    /// <summary>
    /// Finds a city by name and country
    /// </summary>
    /// <param name="name">City name</param>
    /// <param name="country">City country</param>
    /// <returns>City if found</returns>
    public City Find(string name, string country)
    {
        var query = $@"SELECT * FROM `{Config.TblPrefix}Cities` WHERE Name=?name AND Country=?country";

        var drc =
            Sql.Query(query, args =>
            {
                args.Add("?name", name);
                args.Add("?country", country);
            });

        if (drc.Count > 0)
        {
            var result =
                Sql.MapOne<City>(drc, (dre, e) =>
                {
                    e.Name = dre.From<string>("Name");
                    e.Country = dre.From<string>("Country");
                    e.Population = dre.From<int>("Population");
                    e.Latitude = dre.From<decimal>("Latitude");
                    e.Longitude = dre.From<decimal>("Longitude");
                    e.Elevation = dre.From<int>("Elevation");
                    e.AverageAnnualTemperature = dre.From<decimal>("Average_annual_temperature");
                    e.AverageAnnualPrecipitation = dre.From<int>("Average_annual_precipitation");
                    e.FoundingDate = dre.From<DateTime>("Founding_date");
                    e.TimeZone = dre.From<int>("Time_zone");
                });

            return result;
        }

        return null;
    }

    /// <summary>
    /// Deletes a city from the database by name and country
    /// </summary>
    /// <param name="name">City name</param>
    /// <param name="country">City country</param>
    public void Delete(string name, string country)
    {
        var query = $@"DELETE FROM `{Config.TblPrefix}Cities` WHERE Name=?name AND Country=?country";
        Sql.Delete(query, args =>
        {
            args.Add("?name", name);
            args.Add("?country", country);
        });
    }

    /// <summary>
    /// Inserts a new city into the database
    /// </summary>
    /// <param name="city">City to insert</param>
    public void Insert(City city)
    {
        var query = $@"INSERT INTO `{Config.TblPrefix}Cities`
        (
            Name,
            Country,
            Population,
            Latitude,
            Longitude,
            Elevation,
            Average_annual_temperature,
            Average_annual_precipitation,
            Founding_date,
            Time_zone
        )
        VALUES
        (
            ?name,
            ?country,
            ?population,
            ?latitude,
            ?longitude,
            ?elevation,
            ?averageAnnualTemperature,
            ?averageAnnualPrecipitation,
            ?foundingDate,
            ?timeZone
        )";

        Sql.Insert(query, args =>
        {
            args.Add("?name", city.Name);
            args.Add("?country", city.Country);
            args.Add("?population", city.Population);
            args.Add("?latitude", city.Latitude);
            args.Add("?longitude", city.Longitude);
            args.Add("?elevation", city.Elevation);
            args.Add("?averageAnnualTemperature", city.AverageAnnualTemperature);
            args.Add("?averageAnnualPrecipitation", city.AverageAnnualPrecipitation);
            args.Add("?foundingDate", city.FoundingDate);
            args.Add("?timeZone", city.TimeZone);
        });
    }
}