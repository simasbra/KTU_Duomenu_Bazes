using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class WeatherStationRepository
{
    public List<WeatherStation> GetList()
    {
        var query = "SELECT * FROM `Weather_Stations` ORDER BY Code ASC";
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
}