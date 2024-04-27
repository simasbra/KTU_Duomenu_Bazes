import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherStationEdit() {
    const navigate = useNavigate();
    const [station, setStation] = useState({});
    const [status, setStatus] = useState({});
    const [cities, setCities] = useState([]);

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

    const handleSave = (station, status) => {
        const payload = {
            ...status,
            fk_WeatherStationCode: station.code
        };


        console.log(status);

        if (window.confirm(`Are you sure you want to save ${station.code}?`)) {
            axios.post(`api/weatherStation/insert`, station, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(error => {
                    console.error('Failed to update the weather station' + error);
                });

            axios.post(`api/operationalStatus/insert`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    alert('Weather station updated successfully');
                    navigate(`/weather-stations`,);
                })
                .catch(error => {
                    console.error('Failed to update the operational status' + error);
                });
        }
    }

    const handleStationInput = (event) => {
        if (event.target.name === 'city') {
            const [fk_cityName, fk_cityCountry] = event.target.value.split(', ');
            setStation({
                ...station,
                fk_cityName,
                fk_cityCountry
            });
        } else {
            setStation({
                ...station,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleStatusInput = (event) => {
        setStatus({
            ...status,
            [event.target.name]: event.target.value
        });
    }

    const handleStatusCheck = (event) => {
    if (event.target.name === 'status') {
        setStatus({
            ...status,
            [event.target.name]: event.target.checked,
            dateTo: event.target.checked ? null : status.dateTo
        });
    }
}

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }

    return (
        <Container>
            <StationContainer>
                <Header>Add Weather Station</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={station?.code}
                       onChange={handleStationInput}></Input>
                <Label>Managing organization</Label>
                <Input type="text" name="managingOrganization" value={station?.managingOrganization}
                       onChange={handleStationInput}></Input>
                <Label>Latitude</Label>
                <Input type="text" name="latitude" value={station?.latitude}
                       onChange={handleStationInput}></Input>
                <Label>Longitude</Label>
                <Input type="text" name="longitude" value={station?.longitude}
                       onChange={handleStationInput}></Input>
                <Label>Elevation</Label>
                <Input type="text" name="elevation" value={station?.elevation}
                       onChange={handleStationInput}></Input>
                <Label>Type</Label>
                <Input type="text" name="type" value={station?.type}
                       onChange={handleStationInput}></Input>
                <Label>City</Label>
                <Select name="city" value={station?.city} onChange={handleStationInput}>
                    {cities.map((city) => (
                        <option key={city.name + city.country} value={city.name + ', ' + city.country}>
                            {city.name + ', ' + city.country}
                        </option>
                    ))}
                </Select>
            </StationContainer>

            <StatusContainer>
                <Header>Add Operational status of Weather Station</Header>
                <Label>Operational from</Label>
                <Input type="text" name="dateFrom" value={status?.dateFrom} 
                       onChange={handleStatusInput}></Input>
                <CheckBoxContainer>
                    <Label>Status (working?)</Label>
                    <CheckBox type="checkbox" name="status" checked={status?.status || false}
                              onChange={handleStatusCheck}></CheckBox>
                </CheckBoxContainer>
                {!status?.status && (
                    <>
                        <Label>Operational until</Label>
                        <Input type="text" name="dateTo" value={status?.dateTo}
                               onChange={handleStatusInput}></Input>
                    </>
                )}
            </StatusContainer>

            <ActionsContainer>
                <Button onClick={() => handleSave(station, status)}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherStationEdit;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Select = styled.select`
    margin: 5px 0;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Label = styled.label`
    margin: 5px 0 0 0;
`;

const StationContainer = styled.div`
    padding: 0 0 20px 0;
    margin: 0;
    display: grid;
`;

const StatusContainer = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
`;

const CheckBox = styled.input`
    margin: 5px 0 0 0;
    padding: 0;
    width: 20px;
    height: 20px;
`;

const CheckBoxContainer = styled.div`
    display: grid;
    justify-content: start;
    align-items: center;
`;