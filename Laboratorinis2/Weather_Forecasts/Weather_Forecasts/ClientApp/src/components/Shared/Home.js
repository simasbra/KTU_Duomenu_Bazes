import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Header} from './Components';

export function Home() {
    const navigate = useNavigate();

    return (
        <Container>
            <Header>Welcome to the Weather Forecasts App</Header>
            <p>Web application for "P175B602 Duomenų bazės" module second and third laboratory works.</p>
            <ul>
                <li>
                    <Link onClick={() => navigate('/cities')}>Cities</Link>
                </li>
                <li>
                    <Link onClick={() => navigate('/weather-stations')}>Weather Stations</Link>
                </li>
                <li>
                    <Link onClick={() => navigate('/weather-forecasts')}>Weather Forecasts</Link>
                </li>
                <li>
                    <Link onClick={() => navigate('/temperature-reports')}>Temperature Reports</Link>
                </li>
            </ul>
        </Container>
    );
}
export default Home;


const Container = styled.div`
    padding: 0 10px;
    margin: 0;
    display: grid;
`;

const Link = styled.a`
    font-size: 1.2em;
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;