import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherStationView() {
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state?.code;
    const [station, setStation] = useState({});
    const [status, setStatus] = useState({});

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
                })
                .catch(error => {
                    console.error('Failed to fetch operational status', error);
                });
        };

        fetchStation();
        fetchOperationalStatus();
    }, []);

    const handleEdit = (station) => {
        navigate(`/weather-stations/${station.code}/edit`, {state: {code: station.code}});
    }

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }

    return (
        <Container>
            <StationContainer>
                <Header>{station?.code || ''} Weather Station Information</Header>
                <Label>Code</Label>
                <Input type="text" name="code" value={station?.code} readOnly></Input>
                <Label>Managing organization</Label>
                <Input type="text" name="managingOrganization" value={station?.managingOrganization || ''} readOnly></Input>
                <Label>Latitude</Label>
                <Input type="text" name="latitude" value={station?.latitude || ''} readOnly></Input>
                <Label>Longitude</Label>
                <Input type="text" name="longitude" value={station?.longitude || ''} readOnly></Input>
                <Label>Elevation</Label>
                <Input type="text" name="elevation" value={station?.elevation || ''} readOnly></Input>
                <Label>Type</Label>
                <Input type="text" name="type" value={station?.type || ''} readOnly></Input>
                {/*<Label>City</Label>*/}
                {/*<Input type="text" name="city" value={station?.fk_CityName || ''} readOnly></Input>*/}
                {/*<Label>Country</Label>*/}
                {/*<Input type="text" name="country" value={station?.fk_CityCountry || ''} readOnly></Input>*/}
            </StationContainer>
            
            <StatusContainer>
                <Header>Operational status of {station?.code} Weather Station</Header>
                <Label>Operational from</Label>
                <Input type="text" name="dateFrom" value={status?.dateFrom || ''} readOnly></Input>
                <Label>Operational until</Label>
                <Input type="text" name="dateTo" value={status?.dateTo || ''} readOnly></Input>
                <Label>Status (working?)</Label>
                <Input type="text" name="status" value={status?.status} readOnly></Input>
            </StatusContainer>

            <ActionsContainer>
                <Button onClick={() => handleEdit(station)}>Edit</Button>
                <Button onClick={() => handleCancel()}>Back</Button>
            </ActionsContainer>
        </Container>
    );
}

export default WeatherStationView;

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