import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, DeleteButton, ActionsContainer} from '../Shared/Components';
import axios from '../../axiosConfig';

export function OperationalStatusEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = React.useState(location.state?.status);

    const handleSave = (status) => {
        
    }

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }

    const handleInput = (event) => {
        setStatus({
            ...status,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Container>
            <Header>Edit Operational status of {status.status || ''} Weather Station</Header>
            <Label>Operational from</Label>
            <Input type="text" name="dateFrom" value={status?.dateFrom || ''}
                   onChange={handleInput}></Input>
            <Label>Operational until</Label>
            <Input type="text" name="dateTo" value={status?.dateTo || ''}
                   onChange={handleInput}></Input>
            <Label>Status (working?)</Label>
            <Input type="text" name="status" value={status?.status || ''}
                   onChange={handleInput}></Input>
            <ActionsContainer>
                <Button onClick={() => handleSave(status)}>Save</Button>
                <Button onClick={() => handleCancel()}>Cancel</Button>
            </ActionsContainer>
        </Container>
    );
}

export default OperationalStatusEdit;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Label = styled.label`
    margin: 5px 0 0 0;
`;

