namespace Weather_Forecasts.Repositories;

using Weather_Forecasts.Models;

public class CityRepository
{
    public static List<City> GetList()
    {
        var query = "SELECT * FROM `Cities` ORDER BY Name ASC, Country ASC";
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
}