import React from 'react';

const TemperatureHierarchyTable = ({ data }) => {
    return (
        <tbody>
        {data.map(item => (
            <CityRow key={item.city} cityData={item}/>
        ))}
        </tbody>
    );
};

const CityRow = ({ cityData }) => {
    return cityData.weatherStations.map((stationData, stationIndex) => (
        <React.Fragment key={stationData.code}>
            {stationData.forecasts.map((forecastData, forecastIndex) => (
                <React.Fragment key={forecastData.code}>
                    {forecastData.timeStamps.map((timestampData, timestampIndex) => (
                        <tr key={`${forecastData.code}-${timestampData.date}-${timestampData.time}`}>
                            {stationIndex === 0 && forecastIndex === 0 && timestampIndex === 0 && (
                                <td rowSpan={cityData.weatherStations.reduce((acc, s) => acc + s.forecasts.reduce((accF, f) => accF + f.timeStamps.length + 1, 0), 0)}>
                                    {cityData.city}
                                </td>
                            )}
                            {forecastIndex === 0 && timestampIndex === 0 && (
                                <>
                                    <td rowSpan={stationData.forecasts.reduce((accF, f) => accF + f.timeStamps.length + 1, 0)}>
                                        {stationData.code}
                                    </td>
                                    <td rowSpan={stationData.forecasts.reduce((accF, f) => accF + f.timeStamps.length + 1, 0)}>
                                        {new Date(stationData.operationalStatus.operationalFrom).toLocaleDateString('lt-LT')}
                                    </td>
                                    <td rowSpan={stationData.forecasts.reduce((accF, f) => accF + f.timeStamps.length + 1, 0)}>
                                        {new Date(stationData.operationalStatus.operationalUntil).toLocaleDateString('lt-LT')}
                                    </td>
                                </>
                            )}
                            {timestampIndex === 0 && (
                                <>
                                    <td rowSpan={forecastData.timeStamps.length + 1}>
                                        {forecastData.code}
                                    </td>
                                    <td rowSpan={forecastData.timeStamps.length + 1}>
                                        {forecastData.confidence}
                                    </td>
                                </>
                            )}
                            <td>{new Date(timestampData.date).toLocaleDateString('lt-LT')}</td>
                            <td>{timestampData.time.slice(11, 16)}</td>
                            <td>{timestampData.temperatures[0].average}</td>
                            <td>{timestampData.temperatures[0].feelsLike}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="10">
                            Average: {forecastData.agregatedTemperature.avgTempThisDay},
                            Maximum: {forecastData.agregatedTemperature.maxTempThisDay},
                            Minimum: {forecastData.agregatedTemperature.minTempThisDay},
                            Record count: {forecastData.agregatedTemperature.tempRecordCount}
                        </td>
                    </tr>
                </React.Fragment>
            ))}
        </React.Fragment>
    ));
};

export default TemperatureHierarchyTable;
