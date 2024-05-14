import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Button, Actions, Input, Header, ActionsContainer, DeleteButton, Table} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function CityView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [city] = useState(location.state?.city);
    const [forecasts, setForecasts] = useState([]);
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        const fetchForecasts = () => {
            axios.get(`api/weatherForecast/city/${city.country}/${city.name}`)
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
    }, []);

    const fetchWeatherForecast = () => {
        axios.get(`api/weatherForecast/cities/${city.country}/${city.name}`)
            .then(response => {
                const formattedData = {
                    ...response.data,
                    date: format(new Date(response.data.date), 'yyyy-MM-dd'),
                };
                setForecast(formattedData);
            })
            .catch(error => {
                console.error('Failed to fetch weather forecast', error);
            });
    }

    const handleEdit = (city) => {
        fetchWeatherForecast();
        navigate(`/cities/${city.name}/edit`, {
            state: {
                city,
                backUrl: `/cities/${city.name}`,
                forecast: forecast
            }
        });
    }

    const handleCancel = () => {
        navigate(`/cities`);
    }

    const handleEditForecast = (forecast) => {
        navigate(`/weather-forecasts/${forecast.code}/edit`, {
            state: {
                code: forecast.code,
                station: forecast.fk_WeatherStationCode,
                backUrl: `/cities/${city.name}`,
                city: city
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

    const handleAddForecast = () => {
        navigate('/weather-forecasts/add',
            {
                state: {
                    city: city,
                    backUrl: `/cities/${city.name}`
                }
            });
    }

    const handleViewForecast = (forecast) => {
        navigate(`/weather-forecasts/${forecast.code}`, {
            state: {
                code: forecast.code,
                station: forecast.fk_WeatherStationCode,
                backUrl: `/cities/${city.name}`,
                city: city
            }
        })
    }

    return (
        <Container>
            <CityContainer>
                <Header>{city?.name} Information</Header>
                <Label>Name</Label>
                <Input type="text" name="name" value={city?.name || ''} readOnly></Input>
                <Label>Country</Label>
                <Input type="text" name="country" value={city?.country} readOnly></Input>
                <Label>Population</Label>
                <Input type="text" name="population" value={city?.population || ''} readOnly></Input>
                <Label>Latitude</Label>
                <Input type="text" name="latitude" value={city?.latitude || ''} readOnly></Input>
                <Label>Longitude</Label>
                <Input type="text" name="longitude" value={city?.longitude || ''} readOnly></Input>
                <Label>Elevation</Label>
                <Input type="text" name="elevation" value={city?.elevation || ''} readOnly></Input>
                <Label>Average annual temperature</Label>
                <Input type="text" name="averageAnnualTemperature" value={city?.averageAnnualTemperature || ''} readOnly></Input>
                <Label>Average annual precipitation</Label>
                <Input type="text" name="averageAnnualPrecipitation" value={city?.averageAnnualPrecipitation || ''} readOnly></Input>
                <Label>Founding date</Label>
                <Input type="text" name="foundingDate" value={city?.foundingDate || ''} readOnly></Input>
                <Label>Time Zone</Label>
                <Input type="text" name="timeZone" value={city?.timeZone || ''} readOnly></Input>
            </CityContainer>

            <ForecastContainer>
                <Header>{city?.name} Weather forecasts</Header>
                <Table>
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Confidence</th>
                        <th>Weather station</th>
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
                            <td>{forecast.fk_WeatherStationCode}</td>
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
            </ForecastContainer>
            
            <ActionsContainer>
                <Button onClick={() => handleAddForecast()}>Add Weather Forecast</Button>
                <Button onClick={() => handleEdit(city)}>Edit City</Button>
                <Button onClick={() => handleCancel()}>Back</Button>
            </ActionsContainer>
        </Container>
    );
}

export default CityView;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Label = styled.label`
    margin: 5px 0 0 0;
`;

const CityContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
`;

const ForecastContainer = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
`;