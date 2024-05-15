import React from 'react';

const TemperatureHierarchyTable = ({ data }) => {
    return (
        <tbody>
        {data.map((report) => (
            <tr key={report.city}>
                <td>{report.city}</td>
                <td>{report.stationCode}</td>
                <td>{new Date(report.operationalFrom).toLocaleDateString('lt-LT')}</td>
                <td>{new Date(report.operationalUntil).toLocaleDateString('lt-LT')}</td>
                <td>{report.forecastCode}</td>
                <td>{report.confidence}</td>
                <td>{new Date(report.date).toLocaleDateString('lt-LT')}</td>
                <td>{report.time.slice(11, 16)}</td>
                <td>{report.temperature}</td>
                <td>{report.feelsLike}</td>
                <td>
                    Average: {report.avgTempThisDay},
                    Maximum: {report.maxTempThisDay},
                    Minimum: {report.minTempThisDay},
                    Record count: {report.tempRecordCount}
                </td>
            </tr>
        ))}
        </tbody>
    )
}

export default TemperatureHierarchyTable;