import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
export function CityList() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axios.get('/cities');
            setCities(response.data);
        } catch (error) {
            console.error('Failed to fetch cities', error);
        }
    };

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
                    <tr key={city.Name + city.Country}>
                        <td>{city.Name}</td>
                        <td>{city.Country}</td>
                        <td>{city.Population}</td>
                        <td>{city.Latitude.toFixed(6)}</td>
                        <td>{city.Longitude.toFixed(6)}</td>
                        <td>{city.Elevation}</td>
                        <td>{city.AverageAnnualTemperature}</td>
                        <td>{city.AverageAnnualPrecipitation}</td>
                        <td>{city.FoundingDate.substring(0, 10)}</td>
                        <td>{city.TimeZone}</td>
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
