import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../axiosConfig';
import {Button, DeleteButton, Actions, Table} from '../Shared/Components';

export function WeatherStationList() {
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStations = () => {
            axios.get('api/weatherStation/table')
                .then(response => {
                    setStations(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch weather stations', error);
                });
        };

        fetchStations();
    }, []);

    const handleEdit = (city) => {
        // navigate(`/cities/${city.name}/edit`, {state: {city}});
    }

    const handleDelete = (city) => {
        // if (window.confirm(`Are you sure you want to delete ${city.name}?`)) {
        //     axios.delete(`api/city/${encodeURIComponent(city.name)}/${encodeURIComponent(city.country)}`)
        //         .then(response => {
        //             setStations(stations.filter(c => c.name !== city.name || c.country !== city.country));
        //             alert('City deleted successfully');
        //         })
        //         .catch(error => {
        //             console.error('Failed to delete the city', error);
        //             alert('Failed to delete the city');
        //         });
        // }
    }

    const handleAdd = () => {
        // navigate('/cities/new');
    }

    return (
        <Container>
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
                        <td>{station.fk_CityName}</td>
                        <td>{station.fk_CityCountry}</td>
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