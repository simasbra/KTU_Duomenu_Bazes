import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import axios from '../../axiosConfig';
import {Button, Actions, Header, ActionsContainer, Table, DeleteButton} from '../Shared/Components';
import {format} from 'date-fns';

export function WeatherForecastList() {
    const navigate = useNavigate();
    const [forecasts, setForecasts] = useState([]);
    
    useEffect(() => {
        const fetchForecasts = () => {
            axios.get('api/weatherForecast/list')
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
    
    const handleEdit = (forecast) => {
    }
    
    const handleDelete = (forecast) => {
    }
    
    const handleAdd = () => {
    }
    
    const handleView = (forecast) => {
        navigate(`/weather-forecasts/${forecast.code}`, {state: {code: forecast.code}})
    }
    
    return (
        <Container>
            <Header>Weather Forecast List</Header>
            <Table>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Date</th>
                    <th>Source</th>
                    <th>Confidence</th>
                    <th>City</th>
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
                        <td>{forecast.cityName}</td>
                        <td>{forecast.weatherStationCode}</td>
                        <td>
                            <Actions>
                                <Button onClick={() => handleEdit(forecast)}>Edit</Button>
                                <DeleteButton onClick={() => handleDelete(forecast)}>Delete</DeleteButton>
                                <Button onClick={() => handleView(forecast)}>View</Button>
                            </Actions>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ActionsContainer>
                <Button onClick={handleAdd}>Add Weather Station</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherForecastList;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
`;