import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer, Label} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherForecastView() {
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state?.code;
    const stationCode = location.state?.station;
    const [station, setStation] = useState({});
    const [forecast, setForecast] = useState({});

    useEffect(() => {
        const fetchStation = () => {
            axios.get(`api/weatherStation/${stationCode}`)
                .then(response => {
                    setStation(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch weather station', error);
                });
        };
        
        const fetchWeatherForecast = () => {
            axios.get(`api/weatherForecast/${code}`)
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

        fetchWeatherForecast();
        fetchStation();
    }, []);

    const handleEdit = (station) => {
    }

    const handleCancel = () => {
        navigate(`/weather-forecasts`,);
    }

    return (
        <Container>
            <ForecastContainer>
                <Header>{forecast?.code} Weather Forecast Information</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={forecast?.code} readOnly></Input>
                <Label>Date</Label>
                <Input type="text" name="date" value={forecast?.date} readOnly></Input>
                <Label>Source</Label>
                <Input type="text" name="source" value={forecast?.source} readOnly></Input>
                <Label>Confidence</Label>
                <Input type="text" name="confidence" value={forecast?.confidence} readOnly></Input>
                <Label>Weather Station</Label>
                <Input type="text" name="weatherStation" value={forecast?.fk_WeatherStationCode} readOnly></Input>
                <Label>City</Label>
                <Input type="text" name="city" value={forecast?.fk_CityName} readOnly></Input>
                <Label>Country</Label>
                <Input type="text" name="country" value={forecast?.fk_CityCountry} readOnly></Input>
            </ForecastContainer>
            
            <StationContainer>
                <Header>{station?.code || ''} Weather Station Information</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={station?.code} readOnly></Input>
                <Label>Managing organization</Label>
                <Input type="text" name="managingOrganization" value={station?.managingOrganization || ''}
                       readOnly></Input>
                <Label>Latitude</Label>
                <Input type="text" name="latitude" value={station?.latitude || ''} readOnly></Input>
                <Label>Longitude</Label>
                <Input type="text" name="longitude" value={station?.longitude || ''} readOnly></Input>
                <Label>Elevation</Label>
                <Input type="text" name="elevation" value={station?.elevation || ''} readOnly></Input>
                <Label>Type</Label>
                <Input type="text" name="type" value={station?.type || ''} readOnly></Input>
                <Label>City</Label>
                <Input type="text" name="city" value={station?.fk_CityName || ''} readOnly></Input>
                <Label>Country</Label>
                <Input type="text" name="country" value={station?.fk_CityCountry || ''} readOnly></Input>
            </StationContainer>

            <ActionsContainer>
                <Button onClick={() => handleEdit(station)}>Edit</Button>
                <Button onClick={() => handleCancel()}>Back</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherForecastView;

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

const ForecastContainer = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
`;