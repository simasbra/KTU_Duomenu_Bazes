import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Input, Header, ActionsContainer, Label, Select} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherForecastAdd() {
    const navigate = useNavigate();
    const [forecast, setForecast] = useState({});
    const [cities, setCities] = useState([]);
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchCities = () => {
            axios.get('api/city')
                .then(response => {
                    const formattedCities = response.data.map(city => ({
                        ...city,
                        foundingDate: format(new Date(city.foundingDate), 'yyyy-MM-dd')
                    }));
                    setCities(formattedCities);
                })
                .catch(error => {
                    console.error('Failed to fetch cities', error);
                });
        };
        
        const fetchStations = () => {
            axios.get('api/weatherStation')
                .then(response => {
                    setStations(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch weather stations', error);
                });
        };

        fetchStations();
        fetchCities();
    }, []);
    

    const handleInput = (event) => {
        if (event.target.name === 'city') {
            const [fk_CityName, fk_CityCountry] = event.target.value.split(', ');
            setForecast({
                ...forecast,
                fk_CityName,
                fk_CityCountry
            });
        } else if (event.target.name === 'station') {
            setForecast({
                ...forecast,
                fk_WeatherStationCode: event.target.value
            });
        } else {
            setForecast({
                ...forecast,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleCancel = () => {
        navigate(`/weather-forecasts`,);
    }
    
    const handleSave = (forecast) => {
        if (window.confirm(`Are you sure you want to save ${forecast.code}?`)) {
            axios.post(`api/weatherForecast/insert`, forecast, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    alert('Weather forecast added successfully');
                    navigate(`/weather-forecasts`,);
                })
                .catch(error => {
                    console.error('Failed to add the weather forecast' + error);
                });
        }
    }

    return (
        <Container>
            <ForecastContainer>
                <Header>Add Weather Forecast</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={forecast?.code} onChange={handleInput}></Input>
                <Label>Date</Label>
                <Input type="text" name="date" value={forecast?.date} onChange={handleInput}></Input>
                <Label>Source</Label>
                <Input type="text" name="source" value={forecast?.source} onChange={handleInput}></Input>
                <Label>Confidence</Label>
                <Input type="text" name="confidence" value={forecast?.confidence} onChange={handleInput}></Input>
                <Label>Weather Station</Label>
                <Select type="text" name="station" value={forecast?.station} onChange={handleInput}>
                    {stations.map((station) => (
                        <option key={station.code} value={station.code}>
                            {station.code}
                        </option>
                    ))}
                </Select>
                <Label>City</Label>
                <Select type="text" name="city" value={forecast?.city} onChange={handleInput}>
                    {cities.map((city) => (
                        <option key={city.name + city.country} value={city.name + ', ' + city.country}>
                            {city.name + ', ' + city.country}
                        </option>
                    ))}
                </Select>
            </ForecastContainer>

            <ActionsContainer>
                <Button onClick={() => handleSave(forecast)}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherForecastAdd;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const ForecastContainer = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
`;