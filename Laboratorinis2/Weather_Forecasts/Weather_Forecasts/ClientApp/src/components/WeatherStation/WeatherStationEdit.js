import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {
    Button,
    Input,
    Header,
    ActionsContainer,
    Label,
    CheckBoxContainer,
    CheckBox,
    Select,
    DatePicker
} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function WeatherStationEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state?.code;
    const [station, setStation] = useState({});
    const [status, setStatus] = useState({});
    const [cities, setCities] = useState([]);
    const backUrl = location.state?.backUrl;

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

    const validate = (station) => {
        let errors = {};
        if (!station) {
            errors = "Station is required.";
            return errors;
        }
        if (!station.code)
            errors.code = "Station code is required.";
        if (!station.managingOrganization)
            errors.managingOrganization = "Managing organization is required.";
        if (!station.latitude || isNaN(station.latitude))
            errors.latitude = "Valid latitude is required.";
        if (!station.longitude || isNaN(station.longitude))
            errors.longitude = "Valid longitude is required.";
        if (!station.elevation || isNaN(station.elevation))
            errors.elevation = "Valid elevation is required.";
        if (!station.type)
            errors.type = "Station type is required.";
        if (!station.fk_CityName || !station.fk_CityCountry)
            errors.city = "City is required.";

        if (!status) {
            errors = "Operational status is required.";
            return errors;
        }
        if (!status.dateFrom)
            errors.dateFrom = "Start date of operational status is required.";
        if (status.status === false && !status.dateTo)
            errors.dateTo = "End date is required when the status is not working.";

        return errors;
    };

    const handleSave = (station, status) => {
        const errors = validate(station);
        if (Object.keys(errors).length > 0) {
            alert(Object.values(errors).join('\n'));
            return;
        }
        
        if (window.confirm(`Are you sure you want to save ${station.code}?`)) {
            axios.put(`api/weatherStation/${encodeURIComponent(station.code)}`, station, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(error => {
                    console.error('Failed to update the weather station' + error);
                });
            
            axios.put(`api/operationalStatus/${encodeURIComponent(station.code)}`, status, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    alert('Weather station updated successfully');
                    navigate(`${backUrl}`,);
                })
                .catch(error => {
                    console.error('Failed to update the operational status' + error);
                });
        }
    }

    const handleStationInput = (event) => {
        if (event.target.name === 'city') {
            const [fk_CityName, fk_CityCountry] = event.target.value.split(', ');
            setStation({
                ...station,
                fk_CityName,
                fk_CityCountry
            });
        } else {
            setStation({
                ...station,
                [event.target.name]: event.target.value
            });
        }
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
        navigate(`${backUrl}`, {
            state: {
                station: station,
                code: code
            }
        });
    }

    const handleDateFromChange = (date) => {
        setStatus({
            ...status,
            dateFrom: format(date, 'yyyy-MM-dd')
        });
    };

    const handleDateToChange = (date) => {
        setStatus({
            ...status,
            dateTo: format(date, 'yyyy-MM-dd')
        });
    };

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
                <Label>City</Label>
                <Select name="city" value={station?.fk_CityName + ', ' + station.fk_CityCountry} onChange={handleStationInput}>
                    {cities.map((city) => (
                        <option key={city.name + ', ' + city.country} value={city.name + ', ' + city.country}>
                            {city.name + ', ' + city.country}
                        </option>
                    ))}
                </Select>
            </StationContainer>
            
            <StatusContainer>
                <Header>Edit Operational status of {station?.code} Weather Station</Header>
                <Label>Operational from</Label>
                <DatePicker
                    selected={status?.dateFrom ? new Date(status?.dateFrom) : null}
                    onChange={handleDateFromChange}
                    dateFormat="yyyy-MM-dd"
                    className="input"
                    popperPlacement="bottom-start"
                />
                <CheckBoxContainer>
                    <Label>Status (working?)</Label>
                    <CheckBox type="checkbox" name="status" checked={status?.status || false}
                              onChange={handleStatusCheck}></CheckBox>
                </CheckBoxContainer>
                {!status?.status && (
                    <>
                        <Label>Operational until</Label>
                        <DatePicker
                            selected={status?.dateTo ? new Date(status?.dateTo) : null}
                            onChange={handleDateToChange}
                            dateFormat="yyyy-MM-dd"
                            className="input"
                            popperPlacement="bottom-start"
                        />
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