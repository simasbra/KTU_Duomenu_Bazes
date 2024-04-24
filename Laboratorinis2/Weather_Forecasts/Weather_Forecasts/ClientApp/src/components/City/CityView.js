import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer} from '../Shared/Components';

export function CityView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [city, setCity] = React.useState(location.state?.city);

    const handleEdit = (city) => {
        navigate(`/cities/${city.name}/edit`, {state: {city}});
    }

    const handleCancel = () => {
        navigate(`/cities`,);
    }

    return (
        <Container>
            <Header>{city?.name} Information</Header>
            <Label>Name</Label>
            <Input type="text" name="name" value={city?.name || ''} readOnly></Input>
            <Label>Country</Label>
            <Input type="text" name="country" value={city?.country} readOnly></Input>
            <Label>Population</Label>
            <Input type="text" name="population" value={city?.population || ''} readOnly></Input>
            <Label>Latitude</Label>
            <Input type="text" name="latitude" value={city?.latitude || ''} readOnly></Input>
            <Label>Longitude</Label>
            <Input type="text" name="longitude" value={city?.longitude || ''} readOnly></Input>
            <Label>Elevation</Label>
            <Input type="text" name="elevation" value={city?.elevation || ''} readOnly></Input>
            <Label>Average annual temperature</Label>
            <Input type="text" name="averageAnnualTemperature" value={city?.averageAnnualTemperature || ''} readOnly></Input>
            <Label>Average annual precipitation</Label>
            <Input type="text" name="averageAnnualPrecipitation" value={city?.averageAnnualPrecipitation || ''} readOnly></Input>
            <Label>Founding date</Label>
            <Input type="text" name="foundingDate" value={city?.foundingDate || ''} readOnly></Input>
            <Label>Time Zone</Label>
            <Input type="text" name="timeZone" value={city?.timeZone || ''} readOnly></Input>
            <ActionsContainer>
                <Button onClick={() => handleEdit(city)}>Edit</Button>
                <Button onClick={() => handleCancel()}>Back</Button>
            </ActionsContainer>
        </Container>
    );
}

export default CityView;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Label = styled.label`
    margin: 5px 0 0 0;
`;

