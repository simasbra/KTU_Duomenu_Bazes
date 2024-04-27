import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button, Actions, Input, Header, DeleteButton, ActionsContainer, Label} from '../Shared/Components';
import axios from '../../axiosConfig';
import {format} from 'date-fns';

export function OperationalStatusView() {
    const navigate = useNavigate();
    const location = useLocation();
    const code = location.state?.code;
    const [status, setStatus] = useState({});

    useEffect(() => {
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

        fetchOperationalStatus();
    }, []);
    
    const handleEdit = () => {
        navigate(`/weather-stations/${code}/operational-status/${status.id}/edit`, {state: {status: status}});
    }

    const handleInput = (event) => {
        setStatus({
            ...status,
            [event.target.name]: event.target.value
        });
    }

    const handleCancel = () => {
        navigate(`/weather-stations`,);
    }
    
    const handleDelete = () => {
    }

    return (
        <Container>
            <Header>Operational status of {status?.fk_Weather_StationCode || ''} Weather Station</Header>
            <Label>Operational from</Label>
            <Input type="text" name="dateFrom" value={status?.dateFrom || ''}
                   readOnly></Input>
            {status?.dateTo && (
                <>
                    <Label>Operational until</Label>
                    <Input type="text" name="dateTo" value={status?.dateTo || ''} readOnly></Input>
                </>
            )}
            <Label>Status (working?)</Label>
            <Input type="text" name="status" value={status?.status || ''}
                   readOnly></Input>
            <ActionsContainer>
                <Button onClick={() => handleEdit()}>Edit</Button>
                <DeleteButton onclick={() => handleDelete()}>Delete</DeleteButton>
                <Button onClick={() => handleCancel()}>Back</Button>
            </ActionsContainer>
        </Container>
    );
}

export default OperationalStatusView;

const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

