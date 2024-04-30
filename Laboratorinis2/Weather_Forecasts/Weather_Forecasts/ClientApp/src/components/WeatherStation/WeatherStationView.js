import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Button, Input, Header, ActionsContainer, Label, Table, Actions, DeleteButton} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherStationView() {
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state?.code;
    const [station, setStation] = useState({});
    const [status, setStatus] = useState({});
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        const fetchStation = () => {
            axios.get(`api/weatherStation/${code}`)
                .then(response => {
                    setStation(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch weather stations', error);
                });
        };

        const fetchOperationalStatus = () => {
            axios.get(`api/operationalStatus/${code}`)
                .then(response => {
                    const formattedData = {
                        ...response.data,
                        dateFrom: format(new Date(response.data.dateFrom), 'yyyy-MM-dd'),
                        dateTo: response.data.dateTo ? format(new Date(response.data.dateTo), 'yyyy-MM-dd') : null
                    };
                    setStatus(formattedData);
                })
                .catch(error => {
                    console.error('Failed to fetch operational status', error);
                });
        };

        const fetchForecasts = () => {
            axios.get(`api/weatherForecast/station/${code}`)
                .then(response => {
                    const formattedData = response.data.map(item => ({
                        ...item,
                        date: format(new Date(item.date), 'yyyy-MM-dd')
                    }));
                    setForecasts(formattedData);
                })
                .catch(error => {
                    console.error('Failed to fetch weather forecasts', error);
                });
        };

        fetchForecasts();
        fetchStation();
        fetchOperationalStatus();
    }, []);

    const handleEdit = (station) => {
        navigate(`/weather-stations/${station.code}/edit`, {
            state: {
                code: station.code,
                backUrl: `/weather-stations/${station.code}`
            }
        });
    }

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }

    const handleEditForecast = (forecast) => {
        navigate(`/weather-forecasts/${forecast.code}/edit`, {
            state: {
                code: forecast.code,
                station: station.code,
                backUrl: `/weather-stations/${station.code}`,
                forecast: forecast
            }
        })
    }

    const handleDeleteForecast = (forecast) => {
        if (window.confirm('Are you sure you want to delete this weather forecast?')) {
            axios.delete(`api/weatherForecast/${forecast.code}`)
                .then(() => {
                    window.alert('Weather forecast deleted successfully');
                    setForecasts(forecasts.filter(item => item.code !== forecast.code));
                })
                .catch(error => {
                    window.alert('Failed to delete weather forecast');
                    console.error('Failed to delete weather forecast', error);
                });
        }
    }

    const handleAddForecast = (forecast) => {
        navigate('/weather-forecasts/add',
            {
                state: {
                    station: station.code,
                    backUrl: `/weather-stations/${station.code}`
                }
            });
    }

    const handleViewForecast = (forecast) => {
        navigate(`/weather-forecasts/${forecast.code}`, {
            state: {
                code: forecast.code,
                station: forecast.fk_WeatherStationCode,
                backUrl: `/weather-stations/${station.code}`,
            }
        })
    }

    return (
        <Container>
            <StationContainer>
                <Header>{station?.code || ''} Weather Station Information</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={station?.code} readOnly></Input>
                <Label>Managing organization</Label>
                <Input type="text" name="managingOrganization" value={station?.managingOrganization || ''} readOnly></Input>
                <Label>Latitude</Label>
                <Input type="text" name="latitude" value={station?.latitude || ''} readOnly></Input>
                <Label>Longitude</Label>
                <Input type="text" name="longitude" value={station?.longitude || ''} readOnly></Input>
                <Label>Elevation</Label>
                <Input type="text" name="elevation" value={station?.elevation || ''} readOnly></Input>
                <Label>Type</Label>
                <Input type="text" name="type" value={station?.type || ''} readOnly></Input>
                {/*<Label>City</Label>*/}
                {/*<Input type="text" name="city" value={station?.fk_CityName || ''} readOnly></Input>*/}
                {/*<Label>Country</Label>*/}
                {/*<Input type="text" name="country" value={station?.fk_CityCountry || ''} readOnly></Input>*/}
            </StationContainer>
            
            <StatusContainer>
                <Header>Operational status of {station?.code} Weather Station</Header>
                <Label>Operational from</Label>
                <Input type="text" name="dateFrom" value={status?.dateFrom || ''} readOnly></Input>
                <Label>Operational until</Label>
                <Input type="text" name="dateTo" value={status?.dateTo || ''} readOnly></Input>
                <Label>Status (working?)</Label>
                <Input type="text" name="status" value={status?.status} readOnly></Input>
            </StatusContainer>
            
            <StationContainer>
                <Header>Weather Forecast List</Header>
                <Table>
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Confidence</th>
                        <th>City</th>
                        <th>Weather Station</th>
                        <th style={{textAlign: 'center'}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forecasts.map((forecast) => (
                        <tr key={forecast.code}>
                            <td>{forecast.code}</td>
                            <td>{forecast.date}</td>
                            <td>{forecast.source}</td>
                            <td>{forecast.confidence}</td>
                            <td>{forecast.fk_CityName}</td>
                            <td>{forecast.fk_CityCountry}</td>
                            <td>
                                <Actions>
                                    <Button onClick={() => handleViewForecast(forecast)}>View</Button>
                                    <Button onClick={() => handleEditForecast(forecast)}>Edit</Button>
                                    <DeleteButton onClick={() => handleDeleteForecast(forecast)}>Delete</DeleteButton>
                                </Actions>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </StationContainer>

            <ActionsContainer>
                <Button onClick={() => handleAddForecast()}>Add Weather Forecast</Button>
                <Button onClick={() => handleEdit(station)}>Edit</Button>
                <Button onClick={() => handleCancel()}>Back</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherStationView;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const StationContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
`;

const StatusContainer = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
`;