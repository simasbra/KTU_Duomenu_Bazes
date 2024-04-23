using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class CityRepository
{
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

    public void Delete(string name, string country)
    {
        var query = $@"DELETE FROM `{Config.TblPrefix}Cities` WHERE Name=?name AND Country=?country";
        Sql.Delete(query, args =>
        {
            args.Add("?name", name);
            args.Add("?country", country);
        });
    }
}