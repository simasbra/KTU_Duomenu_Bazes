import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Header} from './Components';

export function Home() {
    const navigate = useNavigate();

    return (
        <Container>
            <Header>Welcome to the Weather Forecasts App</Header>
            <ul>
                <li>
                    <Link onClick={() => navigate('/cities')}>Cities</Link>
                </li>
                <li>
                    <Link onClick={() => navigate('/stations')}>Weather Stations</Link>
                </li>
                <li>
                    <Link onClick={() => navigate('/forecasts')}>Weather Forecasts</Link>
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
`;