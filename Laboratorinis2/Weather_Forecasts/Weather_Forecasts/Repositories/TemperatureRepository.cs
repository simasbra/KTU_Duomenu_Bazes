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
    /// Gets a filtered list by city and date of temperatures from the database
    /// </summary>
    /// <param name="city"></param>
    /// <param name="from"></param>
    /// <param name="to"></param>
    /// <returns>Filtered list of temperatures</returns>
    public List<TemperatureList> GetFilteredList(City city, DateTime from, DateTime to)
    {
        var query = $@"SELECT * FROM `Temperatures` 
         WHERE `CityName` = ?cityName AND `Date` BETWEEN @from AND @to ORDER BY id_Temperature ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<TemperatureList>(drc, (dre, e) =>
        {

            e.AverageTemperature = dre.From<decimal>("Average");
            e.FeelsLike = dre.From<decimal>("Feels_like");
            e.WeatherStationCode = dre.From<string>("fk_Weather_StationCode");
            e.CityName = dre.From<string>("CityName");
            e.Date = dre.From<DateTime>("Date");
            e.Time = dre.From<TimeSpan>("Time");
            e.WeatherForecastCode = dre.From<string>("fk_Weather_ForecastCode");
        });

        return result;
    }
}