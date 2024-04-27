using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class WeatherForecastRepository
{
    public List<WeatherForecast> GetTable()
    {
        var query = $"SELECT * FROM `{Config.TblPrefix}Weather_Forecasts` ORDER BY Date DESC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<WeatherForecast>(drc, (dre, e) =>
        {
            e.Code = dre.From<string>("Code");
            e.Date = dre.From<DateTime>("Date");
            e.Source = dre.From<string>("Source");
            e.Confidence = dre.From<decimal>("Confidence");
            e.fk_CityName = dre.From<string>("fk_CityName");
            e.fk_CityCountry = dre.From<string>("fk_CityCountry");
            e.fk_WeatherStationCode = dre.From<string>("fk_Weather_StationCode");
        });

        return result;
    }

    /// <summary>
    /// Gets a list of weather forecasts and cities from the database
    /// </summary>
    /// <returns>List of weather forecasts and cities</returns>
    public List<WeatherForecastList> GetList()
    {
        var query = $@"SELECT
        forecast.Code,
        forecast.Date,
        forecast.Source,
        forecast.Confidence,
        city.Name AS CityName,
        station.Code AS WeatherStationCode
        FROM `{Config.TblPrefix}Weather_Forecasts` forecast
            LEFT JOIN `{Config.TblPrefix}Cities` city ON city.Name = forecast.fk_CityName AND city.Country = forecast.fk_CityCountry
            LEFT JOIN `{Config.TblPrefix}Weather_Stations` station ON station.Code = forecast.fk_Weather_StationCode
        ORDER BY forecast.Code ASC";

        var drc = Sql.Query(query);
        
        var result = Sql.MapAll<WeatherForecastList>(drc, (dre, e) =>
        {
            e.Code = dre.From<string>("Code");
            e.Date = dre.From<DateTime>("Date");
            e.Source = dre.From<string>("Source");
            e.Confidence = dre.From<decimal>("Confidence");
            e.CityName = dre.From<string>("CityName");
            e.WeatherStationCode = dre.From<string>("WeatherStationCode");
        });
        
        return result;
    }
    
    /// <summary>
    /// Finds a weather forecast by code in the database
    /// </summary>
    /// <param name="code">Code to find</param>
    /// <returns>Weather forecast if successful</returns>
    public WeatherForecast Find(string code)
    {
        var query = $"SELECT * FROM `{Config.TblPrefix}Weather_Forecasts` WHERE Code = ?code";
        var drc = Sql.Query(query, args =>
        {
            args.Add("?code", code);
        });

        if (drc.Count > 0)
        {
            var result = Sql.MapOne<WeatherForecast>(drc, (dre, e) =>
            {
                e.Code = dre.From<string>("Code");
                e.Date = dre.From<DateTime>("Date");
                e.Source = dre.From<string>("Source");
                e.Confidence = dre.From<decimal>("Confidence");
                e.fk_CityName = dre.From<string>("fk_CityName");
                e.fk_CityCountry = dre.From<string>("fk_CityCountry");
                e.fk_WeatherStationCode = dre.From<string>("fk_Weather_StationCode");
            });
            
            return result;
        }

        return null;
    }
    
    public void Insert(WeatherForecast forecast)
    {
        var query = $@"INSERT INTO `{Config.TblPrefix}Weather_Forecasts`
            (Code, Date, Source, Confidence, fk_CityName, fk_CityCountry, fk_Weather_StationCode)
            VALUES
            (?code, ?date, ?source, ?confidence, ?fk_CityName, ?fk_CityCountry, ?fk_Weather_StationCode)";
        Sql.Insert(query, args =>
        {
            args.Add("?code", forecast.Code);
            args.Add("?date", forecast.Date);
            args.Add("?source", forecast.Source);
            args.Add("?confidence", forecast.Confidence);
            args.Add("?fk_CityName", forecast.fk_CityName);
            args.Add("?fk_CityCountry", forecast.fk_CityCountry);
            args.Add("?fk_Weather_StationCode", forecast.fk_WeatherStationCode);
        });
    }
}
