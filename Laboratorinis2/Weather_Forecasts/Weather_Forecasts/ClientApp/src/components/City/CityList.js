import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

export function CityList() {
    const [cities, setCities] = useState([]);
    
    useEffect(() => {
        const fetchCities = () => {
            axios.get('https://localhost:7022/api/city')
                .then(response => {
                    setCities(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch cities', error);
                });
        };

        fetchCities();
    }, []);
    
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Population</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Elevation</th>
                    <th>Avg Temp (°C)</th>
                    <th>Avg Precipitation (mm)</th>
                    <th>Founding Date</th>
                    <th>Time Zone</th>
                    <th>Actions</th>
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
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </Actions>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default CityList;


const Container = styled.div`
    padding: 0 10px;
    margin: 0;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }
`;

const Actions = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
