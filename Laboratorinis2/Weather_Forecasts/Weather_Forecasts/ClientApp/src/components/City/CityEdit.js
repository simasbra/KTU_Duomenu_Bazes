import React from 'react';
import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer, DatePicker} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function CityEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [city, setCity] = React.useState(location.state?.city);
    const backUrl = location.state?.backUrl;

    const validate = (city) => {
        let errors = {};
        if (!city) {
            errors.name = "City information is required.";
            return errors;
        }
        if (!city.name)
            errors = "City name is required.";
        if (!city.country)
            errors.country = "Country is required.";
        if (!city.population || isNaN(city.population) || parseInt(city.population) <= 0)
            errors.population = "Population must be a positive number.";
        if (!city.latitude || isNaN(city.latitude))
            errors.latitude = "Latitude must be a valid number.";
        if (!city.longitude || isNaN(city.longitude))
            errors.longitude = "Longitude must be a valid number.";
        if (!city.elevation || isNaN(city.elevation))
            errors.elevation = "Elevation must be a valid number.";
        if (!city.averageAnnualTemperature || isNaN(city.averageAnnualTemperature))
            errors.averageAnnualTemperature = "Average annual temperature must be a valid number.";
        if (!city.averageAnnualPrecipitation || isNaN(city.averageAnnualPrecipitation))
            errors.averageAnnualPrecipitation = "Average annual precipitation must be a valid number.";
        if (!city.timeZone)
            errors.timeZone = "Time zone is required.";
        if (!city.foundingDate)
            errors.foundingDate = "Founding date is required.";
        if (city.foundingDate && new Date(city.foundingDate) > new Date())
            errors.foundingDate = "Founding date cannot be in the future.";

        return errors;
    };

    const handleSave = (city) => {
        const errors = validate(city);
        if (Object.keys(errors).length > 0) {
            alert(`${Object.values(errors).join("\n")}`);
            return;
        }
        
        if (window.confirm(`Are you sure you want to save ${city.name}?`)) {
            axios.put(`api/city/${encodeURIComponent(city.name)}/${encodeURIComponent(city.country)}`, city, {
                headers: {
                    'Content-Type':'application/json'
                }
            })
                .then(response => {
                    alert('City updated successfully');
                    navigate(`${backUrl}`,);
                })
                .catch(error => {
                    console.error('Failed to update the city' + error);
                });
        }
    }

    const handleInput = (event) => {
        setCity({
            ...city,
            [event.target.name]: event.target.value
        });
    }
    
    const handleCancel = () => {
        navigate(`${backUrl}`, {
            state: {
                city: location.state?.city,
                backUrl: location.state?.backUrl
            }
        });
    }

    const handleDateChange = (date) => {
        setCity({
            ...city,
            foundingDate: format(date, 'yyyy-MM-dd')
        });
    };
    
    return (
        <Container>
            <Header>Edit {city?.name}</Header>
            <Label>Name</Label>
            <Input type="text" name="name" value={city?.name || ''}
                   style={{backgroundColor: '#ffdede'}} readOnly></Input>
            <Label>Country</Label>
            <Input type="text" name="country" value={city?.country}
                   style={{backgroundColor: '#ffdede'}} readOnly></Input>
            <Label>Population</Label>
            <Input type="text" name="population" value={city?.population || ''}
                   onChange={handleInput}></Input>
            <Label>Latitude</Label>
            <Input type="text" name="latitude" value={city?.latitude || ''}
                   onChange={handleInput}></Input>
            <Label>Longitude</Label>
            <Input type="text" name="longitude" value={city?.longitude || ''}
                   onChange={handleInput}></Input>
            <Label>Elevation</Label>
            <Input type="text" name="elevation" value={city?.elevation || ''}
                   onChange={handleInput}></Input>
            <Label>Average annual temperature</Label>
            <Input type="text" name="averageAnnualTemperature" value={city?.averageAnnualTemperature || ''}
                   onChange={handleInput}></Input>
            <Label>Average annual precipitation</Label>
            <Input type="text" name="averageAnnualPrecipitation" value={city?.averageAnnualPrecipitation || ''}
                   onChange={handleInput}></Input>
            <Label>Founding date</Label>
            <DatePicker
                selected={city?.foundingDate ? new Date(city.foundingDate) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="input"
                popperPlacement="bottom-start"
            />
            <Label>Time Zone</Label>
            <Input type="text" name="timeZone" value={city?.timeZone || ''}
                   onChange={handleInput}></Input>
            <ActionsContainer>
                <Button onClick={() => handleSave(city)}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </ActionsContainer>
        </Container>
    );
}

export default CityEdit;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Label = styled.label`
    margin: 5px 0 0 0;
`;

