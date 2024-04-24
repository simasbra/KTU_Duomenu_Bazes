import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherStationEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state?.code;
    const [station, setStation] = useState({});
    const [status, setStatus] = useState({});
    const [cities, setCities] = useState({});

    useEffect(() => {
        const fetchStation = () => {
            axios.get(`api/weatherStation/${code}`)
                .then(response => {
                    setStation(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch weather stations', error);
                });
        };

        const fetchOperationalStatus = () => {
            axios.get(`api/operationalStatus/${code}`)
                .then(response => {
                    const formattedData = {
                        ...response.data,
                        dateFrom: format(new Date(response.data.dateFrom), 'yyyy-MM-dd'),
                        dateTo: response.data.dateTo ? format(new Date(response.data.dateTo), 'yyyy-MM-dd') : null
                    };
                    setStatus(formattedData);
                    console.log(formattedData);
                })
                .catch(error => {
                    console.error('Failed to fetch operational status', error);
                });
        };

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

        fetchStation();
        fetchOperationalStatus();
        fetchCities();
    }, []);

    const handleSave = (station) => {

    }

    // const handleSave = (city) => {
    //     if (window.confirm(`Are you sure you want to save ${city.name}?`)) {
    //         axios.put(`api/city/${encodeURIComponent(city.name)}/${encodeURIComponent(city.country)}`, city, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(response => {
    //                 alert('City updated successfully');
    //                 navigate(`/cities`,);
    //             })
    //             .catch(error => {
    //                 console.error('Failed to update the city' + error);
    //             });
    //     }
    // }

    const handleStationInput = (event) => {
        setStation({
            ...station,
            [event.target.name]: event.target.value
        });
    }

    const handleStatusInput = (event) => {
        setStatus({
            ...status,
            [event.target.name]: event.target.value
        });
    }

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }

    return (
        <Container>
            <StationContainer>
                <Header>Edit {station?.code || ''} Weather Station</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={station?.code}
                       style={{backgroundColor: '#ffdede'}} readOnly></Input>
                <Label>Managing organization</Label>
                <Input type="text" name="managingOrganization" value={station?.managingOrganization || ''}
                       onChange={handleStationInput}></Input>
                <Label>Latitude</Label>
                <Input type="text" name="latitude" value={station?.latitude || ''}
                       onChange={handleStationInput}></Input>
                <Label>Longitude</Label>
                <Input type="text" name="longitude" value={station?.longitude || ''}
                       onChange={handleStationInput}></Input>
                <Label>Elevation</Label>
                <Input type="text" name="elevation" value={station?.elevation || ''}
                       onChange={handleStationInput}></Input>
                <Label>Type</Label>
                <Input type="text" name="type" value={station?.type || ''}
                       onChange={handleStationInput}></Input>
            </StationContainer>
            
            <StatusContainer>
                <Header>Edit Operational status of {station?.code} Weather Station</Header>
                <Label>Operational from</Label>
                <Input type="text" name="dateFrom" value={status?.dateFrom || ''}
                       onChange={handleStatusInput}></Input>
                <Label>Operational until</Label>
                <Input type="text" name="dateTo" value={status?.dateTo || ''}
                       onChange={handleStatusInput}></Input>
                <Label>Status (working?)</Label>
                <Input type="text" name="status" value={status?.status}
                       onChange={handleStatusInput}></Input>
            </StatusContainer>
            
            <ActionsContainer>
                <Button onClick={() => handleSave(station)}>Save</Button>
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