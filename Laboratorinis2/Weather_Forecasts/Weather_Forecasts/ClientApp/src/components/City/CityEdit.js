import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Actions, Input } from '../Components';

export function CityEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const city = location.state?.city;
    
    const handleSave = () => {
        console.log('Save', city);
    }
    
    const handleCancel = () => {
        navigate(`/cities`,);
    }
    
    return (
        <Container>
            <Label>Name</Label>
            <Input type="text" value={city?.name} />
            <Label>Country</Label>
            <Input type="text" value={city?.country}></Input>
            <Label>Population</Label>
            <Input type="text" value={city?.population}></Input>
            <Label>Latitude</Label>
            <Input type="text" value={city?.latitude}></Input>
            <Label>Longitude</Label>
            <Input type="text" value={city?.longitude}></Input>
            <Label>Elevation</Label>
            <Input type="text" value={city?.elevation}></Input>
            <Label>Average annual temperature</Label>
            <Input type="text" value={city?.averageAnnualTemperature}></Input>
            <Label>Average annual precipitation</Label>
            <Input type="text" value={city?.averageAnnualPrecipitation}></Input>
            <Label>Founding date</Label>
            <Input type="text" value={city?.foundingDate}></Input>
            <Label>Time Zone</Label>
            <Input type="text" value={city?.timeZone}></Input>
            <Actions>
                <Button onClick={() => handleSave()}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </Actions>
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

