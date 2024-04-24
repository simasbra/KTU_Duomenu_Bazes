import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../axiosConfig';
import {Button, DeleteButton, Actions, Table, Header, ActionsContainer} from '../Shared/Components';
import {format} from 'date-fns';

export function CityList() {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    
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

        fetchCities();
    }, []);
    
    const handleEdit = (city) => {
        navigate(`/cities/${city.name}/edit`, { state: { city } });
    }

    const handleDelete = (city) => {
        if (window.confirm(`Are you sure you want to delete ${city.name}?`)) {
            axios.delete(`api/city/${encodeURIComponent(city.name)}/${encodeURIComponent(city.country)}`)
                .then(response => {
                    setCities(cities.filter(c => c.name !== city.name || c.country !== city.country));
                    alert('City deleted successfully');
                })
                .catch(error => {
                    console.error('Failed to delete the city', error);
                    alert('Failed to delete the city');
                });
        }
    }
    
    const handleAdd = () => {
        navigate('/cities/add');
    }
    
    return (
        <Container>
            <Header>Cities List</Header>
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Population</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Elevation (m)</th>
                    <th>Avg Temp (°C)</th>
                    <th>Avg Precip (mm)</th>
                    <th>Founding Date</th>
                    <th>Time Zone (UTC)</th>
                    <th style={{textAlign: 'center'}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cities.map((city) => (
                    <tr key={city.name + city.country}>
                        <td>{city.name}</td>
                        <td>{city.country}</td>
                        <td>{city.population}</td>
                        <td>{city.latitude.toFixed(6)}</td>
                        <td>{city.longitude.toFixed(6)}</td>
                        <td>{city.elevation}</td>
                        <td>{city.averageAnnualTemperature}</td>
                        <td>{city.averageAnnualPrecipitation}</td>
                        <td>{city.foundingDate.substring(0, 10)}</td>
                        <td>{city.timeZone}</td>
                        <td>
                            <Actions>
                                <Button onClick={() => handleEdit(city)}>Edit</Button>
                                <DeleteButton onClick={() => handleDelete(city)}>Delete</DeleteButton>
                            </Actions>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ActionsContainer>
                <Button onClick={handleAdd}>Add City</Button>
            </ActionsContainer>
        </Container>
    );
}

export default CityList;


const Container = styled.div`
    padding: 0 10px;
    margin: 0;
`;