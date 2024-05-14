SELECT 
    stamp.Date,
    TIME_FORMAT(stamp.Time, '%H:%i') AS Time,
    UPPER(city.Name) AS City,
    station.Code AS StationCode,
    status.Date_from AS OperationalFrom,
    IF(status.Status = 1, 'Still working', status.Date_to) AS OperationalUntil,
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
        Laboratorinis2.Weather_Forecasts forecast 
            ON stamp.fk_Weather_ForecastDate = forecast.Date AND stamp.fk_Weather_ForecastCode = forecast.Code
    JOIN 
        Laboratorinis2.Weather_Stations station 
            ON forecast.fk_Weather_StationCode = station.Code
    JOIN
        Cities city
            ON station.fk_CityCountry = city.Country AND station.fk_CityName = city.Name
                AND forecast.fk_CityCountry = city.Country AND forecast.fk_CityName = city.Name
    LEFT JOIN
        Operational_Statuses status
            ON status.fk_Weather_StationCode = station.Code
WHERE
    stamp.Date BETWEEN '2000-01-01' AND '2024-12-30'
        AND forecast.Confidence > 60
        AND city.Name = 'City17'
GROUP BY
    stamp.Date, stamp.Time, city.Name, temp.Average, temp.Feels_like, station.Code,
    status.Date_from, status.Date_to, status.Status, forecast.Code, forecast.Confidence
ORDER BY
    stamp.Date, stamp.Time