import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../axiosConfig';
import {Button, DeleteButton, Actions, Table, Header} from '../Shared/Components';

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
        navigate(`/weather-stations/${station.code}/edit`, {state: {station: station}});
    }

    const handleDelete = (station) => {
        if (window.confirm(`Are you sure you want to delete ${station.code} weather station?`)) {
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
        // navigate('/cities/new');
    }

    return (
        <Container>
            <Header>Weather Stations List</Header>
            <Table>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Managing organization</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Elevation (m)</th>
                    <th>Type</th>
                    <th>City name</th>
                    <th>City country</th>
                    <th>Time Zone (UTF)</th>
                    <th style={{textAlign: 'center'}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {stations.map((station) => (
                    <tr key={station.code}>
                        <td>{station.code}</td>
                        <td>{station.managingOrganization}</td>
                        <td>{station.latitude.toFixed(6)}</td>
                        <td>{station.longitude.toFixed(6)}</td>
                        <td>{station.elevation}</td>
                        <td>{station.type}</td>
                        <td>{station.cityName}</td>
                        <td>{station.cityCountry}</td>
                        <td>{station.timeZone}</td>
                        <td>
                            <Actions>
                                <Button onClick={() => handleEdit(station)}>Edit</Button>
                                <DeleteButton onClick={() => handleDelete(station)}>Delete</DeleteButton>
                            </Actions>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <br/>
            <Actions>
                <Button onClick={handleAdd}>Add Weather Station</Button>
            </Actions>
        </Container>
    );
}

export default WeatherStationList;


const Container = styled.div`
    padding: 0 10px;
    margin: 0;
`;