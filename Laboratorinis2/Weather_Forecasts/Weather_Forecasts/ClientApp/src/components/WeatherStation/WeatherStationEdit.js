import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, ActionsContainer} from '../Shared/Components';
import axios from '../../axiosConfig';

export function CityEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [station, setStation] = React.useState(location.state?.station);

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

    const handleInput = (event) => {
        setStation({
            ...station,
            [event.target.name]: event.target.value
        });
    }

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }

    return (
        <Container>
            <Header>Edit {station?.code || ''} Weather Station</Header>
            {/*<Label>Code</Label>*/}
            {/*<Input type="text" name="code" value={station?.code}*/}
            {/*       style={{backgroundColor: '#ffdede'}} readOnly></Input>*/}
            <Label>Managing organization</Label>
            <Input type="text" name="managingOrganization" value={station?.managingOrganization || ''}
                   onChange={handleInput}></Input>
            <Label>Latitude</Label>
            <Input type="text" name="latitude" value={station?.latitude || ''}
                   onChange={handleInput}></Input>
            <Label>Longitude</Label>
            <Input type="text" name="longitude" value={station?.longitude || ''}
                   onChange={handleInput}></Input>
            <Label>Elevation</Label>
            <Input type="text" name="elevation" value={station?.elevation || ''}
                   onChange={handleInput}></Input>
            <Label>Type</Label>
            <Input type="text" name="type" value={station?.type || ''}
                   onChange={handleInput}></Input>
            <Label>City name</Label>
            <Input type="text" name="cityName" value={station?.cityName || ''}
                   onChange={handleInput}></Input>
            <Label>City country</Label>
            <Input type="text" name="cityCountry" value={station?.cityCountry || ''}
                   onChange={handleInput}></Input>
            <Label>Time Zone</Label>
            <Input type="text" name="timeZone" value={station?.timeZone || ''}
                   onChange={handleInput}></Input>
            <ActionsContainer>
                <Button onClick={() => handleSave(station)}>Save</Button>
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

