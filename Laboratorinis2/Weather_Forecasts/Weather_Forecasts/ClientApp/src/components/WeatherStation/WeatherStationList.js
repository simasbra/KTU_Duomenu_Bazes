import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../axiosConfig';
import {Button, DeleteButton, Actions, Table, Header, ActionsContainer} from '../Shared/Components';

export function WeatherStationList() {
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);

    const handleEdit = (station) => {
        navigate(`/weather-stations/${station.code}/edit`, {
            state: {
                code: station.code,
                backUrl: '/weather-stations'
            }
        });
    }

    const handleDelete = (station) => {
        if (window.confirm(`Are you sure you want to delete ${station.code} weather station?`)) {
            axios.delete(`api/operationalStatus/${encodeURIComponent(station.code)}`)
                .catch(error => {
                    console.error('Failed to delete the operational status', error);
                });
            axios.delete(`api/weatherStation/${encodeURIComponent(station.code)}`)
                .then(response => {
                    setStations(stations.filter(c => c.code !== station.code));
                    alert('Weather station deleted successfully');
                })
                .catch(error => {
                    console.error('Failed to delete the weather station', error);
                    alert('Failed to delete the weather station');
                });
        }
    }

    const handleAdd = () => {
        navigate('/weather-stations/add', {
            state: {
                backUrl: '/weather-stations'
            }
        });
    }
    
    const handleView = (station) => {
        navigate(`/weather-stations/${station.code}`, {
            state: {
                code: station.code,
                backUrl: '/weather-stations'
            }
        })
    }

    return (
        <Container>
            <Header>Weather Stations List</Header>
            <Table>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Managing organization</th>
                    <th>Type</th>
                    <th>City name</th>
                    <th>City country</th>
                    <th>Time Zone (UTF)</th>
                    <th>Operational status</th>
                    <th style={{textAlign: 'center'}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {stations.map((station) => (
                    <tr key={station.code}>
                        <td>{station.code}</td>
                        <td>{station.managingOrganization}</td>
                        <td>{station.type}</td>
                        <td>{station.cityName}</td>
                        <td>{station.cityCountry}</td>
                        <td>{station.timeZone}</td>
                        <td>{station.operationalStatus ? 'Active' : 'Inactive'}</td>
                        <td>
                            <Actions>
                                <Button onClick={() => handleView(station)}>View</Button>
                                <Button onClick={() => handleEdit(station)}>Edit</Button>
                                <DeleteButton onClick={() => handleDelete(station)}>Delete</DeleteButton>
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

export default WeatherStationList;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
`;