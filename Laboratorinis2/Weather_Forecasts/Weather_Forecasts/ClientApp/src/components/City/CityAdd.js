import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer} from '../Shared/Components';
import axios from '../../axiosConfig';

export function CityAdd() {
    const navigate = useNavigate();
    const location = useLocation();
    const [city, setCity] = React.useState(location.state?.city);

    const handleSave = (city) => {
        if (window.confirm(`Are you sure you want to save ${city.name}?`)) {
            axios.post(`api/city`, city, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    alert('City added successfully');
                    navigate(`/cities`,);
                })
                .catch(error => {
                    console.error('Failed to add the city' + error);
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
        navigate(`/cities`,);
    }

    return (
        <Container>
            <Header>Add new city</Header>
            <Label>Name</Label>
            <Input type="text" name="name" value={city?.name}
                   onChange={handleInput}></Input>
            <Label>Country</Label>
            <Input type="text" name="country" value={city?.country}
                   onChange={handleInput}></Input>
            <Label>Population</Label>
            <Input type="text" name="population" value={city?.population}
                   onChange={handleInput}></Input>
            <Label>Latitude</Label>
            <Input type="text" name="latitude" value={city?.latitude}
                   onChange={handleInput}></Input>
            <Label>Longitude</Label>
            <Input type="text" name="longitude" value={city?.longitude}
                   onChange={handleInput}></Input>
            <Label>Elevation</Label>
            <Input type="text" name="elevation" value={city?.elevation}
                   onChange={handleInput}></Input>
            <Label>Average annual temperature</Label>
            <Input type="text" name="averageAnnualTemperature" value={city?.averageAnnualTemperature}
                   onChange={handleInput}></Input>
            <Label>Average annual precipitation</Label>
            <Input type="text" name="averageAnnualPrecipitation" value={city?.averageAnnualPrecipitation}
                   onChange={handleInput}></Input>
            <Label>Founding date</Label>
            <Input type="text" name="foundingDate" value={city?.foundingDate}
                   onChange={handleInput}></Input>
            <Label>Time Zone</Label>
            <Input type="text" name="timeZone" value={city?.timeZone}
                   onChange={handleInput}></Input>
            <ActionsContainer>
                <Button onClick={() => handleSave(city)}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </ActionsContainer>
        </Container>
    );
}

export default CityAdd;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Label = styled.label`
    margin: 5px 0 0 0;
`;