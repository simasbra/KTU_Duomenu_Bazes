using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class TemperaturesRepository
{
    /// <summary>
    /// Gets a list of all temperatures from the database
    /// </summary>
    /// <returns>List of temperatures</returns>
    public List<Temperature> GetList()
    {
        var query = "SELECT * FROM `Temperatures` ORDER BY id_Temperature ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<Temperature>(drc, (dre, e) =>
        {
            e.Id = dre.From<int>("id_Temperature");
            e.Maximum = dre.From<decimal>("Maximum");
            e.Minimum = dre.From<decimal>("Minimum");
            e.Average = dre.From<decimal>("Average");
            e.FeelsLike = dre.From<decimal>("Feels_like");
            e.Fluctuations = dre.From<bool>("Fluctuations");
            e.fk_TimeStampId = dre.From<int>("fk_Time_Stamp");
        });

        return result;
    }

    /// <summary>
    /// Gets a filtered by parameters list of temperatures from the database
    /// </summary>
    /// <param name="city">City name</param>
    /// <param name="dateFrom">Date from</param>
    /// <param name="dateTo">Date to</param>
    /// <param name="confidence">Confidence</param>
    /// <returns>Filtered list of temperatures</returns>
    public List<TemperatureReport> GetFilteredList(string city, DateTime dateFrom, DateTime dateTo, decimal confidence)
    {
        var query = $@"
            SELECT
                DATE_FORMAT(stamp.Date, '%Y-%m-%d') AS Date,
                TIME_FORMAT(stamp.Time, '%H:%i') AS Time,
                UPPER(city.Name) AS City,
                station.Code AS StationCode,
                DATE_FORMAT(status.Date_from, '%Y-%m-%d') AS OperationalFrom,
                IF(status.Status = 1, DATE_FORMAT('2999-12-31', '%Y-%m-%d'), status.Date_to) AS OperationalUntil,
                forecast.Code AS ForecastCode,
                forecast.Confidence,
                temp.Average AS Temperature,
                ROUND(temp.Feels_like, 0) AS FeelsLike,
                ROUND(AVG(temp.Average) OVER (PARTITION BY stamp.Date), 1) AS AvgTempThisDay,
                MAX(temp.Average) OVER (PARTITION BY stamp.Date) AS MaxTempThisDay,
                MIN(temp.Average) OVER (PARTITION BY stamp.Date) AS MinTempThisDay,
                COUNT(temp.id_Temperature) OVER (PARTITION BY stamp.Date) AS TempRecordCount
            FROM 
                Temperatures temp
                JOIN 
                    Time_Stamps stamp 
                        ON stamp.id_Time_Stamp = temp.fk_Time_Stamp
                LEFT JOIN
                    Weather_Forecasts forecast 
                        ON stamp.fk_Weather_ForecastDate = forecast.Date AND stamp.fk_Weather_ForecastCode = forecast.Code
                JOIN 
                    Weather_Stations station 
                        ON forecast.fk_Weather_StationCode = station.Code
                JOIN
                    Cities city
                        ON station.fk_CityCountry = city.Country AND station.fk_CityName = city.Name
                            AND forecast.fk_CityCountry = city.Country AND forecast.fk_CityName = city.Name
                LEFT JOIN
                    Operational_Statuses status
                        ON status.fk_Weather_StationCode = station.Code
            WHERE
                stamp.Date BETWEEN ?dateFrom AND ?dateTo
                    AND forecast.Confidence >= ?confidence
                    AND city.Name = ?cityName
            GROUP BY
                stamp.Date, stamp.Time, city.Name, temp.Average, temp.Feels_like, station.Code,
                status.Date_from, status.Date_to, status.Status, forecast.Code, forecast.Confidence
            ORDER BY
                stamp.Date, stamp.Time";
        var drc = Sql.Query(query, args =>
        {
            args.Add("?dateFrom", dateFrom);
            args.Add("?dateTo", dateTo);
            args.Add("?confidence", confidence);
            args.Add("cityName", city);
        });

        if (drc.Count < 0)
        {
            return null;
        }

        var result = Sql.MapAll<TemperatureReport>(drc, (dre, e) =>
        {
            e.Date = dre.From<DateTime>("Date");
            e.Time = dre.From<TimeSpan>("Time");
            e.City = dre.From<string>("City");
            e.StationCode = dre.From<string>("StationCode");
            e.OperationalFrom = dre.From<DateTime>("OperationalFrom");
            e.OperationalUntil = dre.From<DateTime>("OperationalUntil");
            e.ForecastCode = dre.From<string>("ForecastCode");
            e.Confidence = dre.From<decimal>("Confidence");
            e.Temperature = dre.From<decimal>("Temperature");
            e.FeelsLike = dre.From<int>("FeelsLike");
            e.AvgTempThisDay = dre.From<decimal>("AvgTempThisDay");
            e.MaxTempThisDay = dre.From<decimal>("MaxTempThisDay");
            e.MinTempThisDay = dre.From<decimal>("MinTempThisDay");
            e.TempRecordCount = dre.From<int>("TempRecordCount");
        });

        return result;
    }
}