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
    /// Finds a weather forecast by weather forecast code in the database
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

    /// <summary>
    /// Finds weather forecasts by city = in the database
    /// </summary>
    /// <param name="cityName">City name to find</param>
    /// <param name="cityCountry">City Country</param>
    /// <returns>List of Weather Forecasts if successful</returns>
    public List<WeatherForecast> FindByCity(string cityName, string cityCountry)
    {
        var query = $"SELECT * FROM `{Config.TblPrefix}Weather_Forecasts` WHERE fk_CityName = ?cityName AND fk_CityCountry = ?cityCountry ORDER BY Date DESC";
        var drc = Sql.Query(query, args =>
        {
            args.Add("?cityName", cityName);
            args.Add("?cityCountry", cityCountry);
        });

        if (drc.Count > 0)
        {
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

        return null;
    }

    /// <summary>
    /// Finds weather forecasts by weather station code in the database
    /// </summary>
    /// <param name="code">Weather station code to find</param>
    /// <returns>List of Weather Forecasts if successful</returns>
    public List<WeatherForecast> FindByStation(string code)
    {
        var query = $"SELECT * FROM `{Config.TblPrefix}Weather_Forecasts` WHERE fk_Weather_StationCode = ?code ORDER BY Date DESC";
        var drc = Sql.Query(query, args =>
        {
            args.Add("?code", code);
        });
        
        if (drc.Count > 0)
        {
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

        return null;
    }
    
    /// <summary>
    /// Inserts a new weather forecast into the database
    /// </summary>
    /// <param name="forecast">Weather forecast to insert</param>
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
    
    /// <summary>
    /// Deletes a weather forecast from the database by code
    /// </summary>
    /// <param name="code">Weather forecast code</param>
    public void Delete(string code)
    {
        var query = $"DELETE FROM `{Config.TblPrefix}Weather_Forecasts` WHERE Code = ?code";
        Sql.Delete(query, args =>
        {
            args.Add("?code", code);
        });
    }
    
    /// <summary>
    /// Updates a weather forecast in the database
    /// </summary>
    /// <param name="forecast">Forecast to update</param>
    public void Update(WeatherForecast forecast)
    {
        var query = $@"UPDATE `{Config.TblPrefix}Weather_Forecasts`
            SET Date = ?date, Source = ?source, Confidence = ?confidence, fk_CityName = ?fk_CityName, fk_CityCountry = ?fk_CityCountry, fk_Weather_StationCode = ?fk_Weather_StationCode
            WHERE Code = ?code";
        Sql.Update(query, args =>
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
