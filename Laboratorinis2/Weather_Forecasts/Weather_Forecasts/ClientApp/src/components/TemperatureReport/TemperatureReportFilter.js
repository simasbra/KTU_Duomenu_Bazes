import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../axiosConfig';
import { ActionsContainer, Button, DatePicker, Header, Label, Select, Table } from '../Shared/Components';
import { format } from 'date-fns';

export function TemperatureReportFilter() {

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [confidence, setConfidence] = useState();
    const [isFiltered, setIsFiltered] = useState(false);

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
    
    const handleFilter = () => {
        setIsFiltered(true);
    }
    
    const handleInput = (event) => {
        if (event.target.name === 'city' && event.target.value !== "") {
            setCity(event.target.value);
        }
    }

    const handleDateChange = (selectedDate, dateType) => {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        if (dateType === 'dateFrom') {
            setDateFrom(formattedDate);
        } else if (dateType === 'dateTo') {
            setDateTo(formattedDate);
        }
    }
    
    return (
        <Container>
            <Header>Temperature report</Header>
            <InputsContainer>
                <Label>Select City to filter</Label>
                <Select type="text" name="city" onChange={handleInput}>
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </Select>
                <Label>Filter date from</Label>
                <DatePicker
                    selected={dateFrom ? new Date(dateFrom) : null}
                    onChange={(date) => handleDateChange(date, 'dateFrom')}
                    name="dateFrom"
                    dateFormat="yyyy-MM-dd"
                    className="input"
                    popperPlacement="bottom-start"
                />
                <Label>Filter date to</Label>
                <DatePicker
                    selected={dateTo ? new Date(dateTo) : null}
                    onChange={(date) => handleDateChange(date, 'dateTo')}
                    name="dateTo"
                    dateFormat="yyyy-MM-dd"
                    className="input"
                    popperPlacement="bottom-start"
                />
                <ActionsContainer>
                    <Button onClick={handleFilter}>Filter</Button>
                </ActionsContainer>
            </InputsContainer>

            {isFiltered && (
                <TableContainer>
                    <h3>Report of temperatures for {city} between {dateFrom} and {dateTo}</h3>
                    <Table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>City</th>
                            <th>Station code</th>
                            <th>Operational from</th>
                            <th>Operational until</th>
                            <th>Forecast code</th>
                            <th>Confidence</th>
                            <th>Temperature</th>
                            <th>Feels like</th>
                        </tr>
                        </thead>
                    </Table>
                </TableContainer>
            )}
        </Container>
    )
}

export default TemperatureReportFilter;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const InputsContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
`;

const TableContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
`;