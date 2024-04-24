import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

export class NavMenu extends Component {
    render() {
        return (
            <Navbar>
                <NavList>
                    <NavItem>
                        <StyledLink to="/">
                            <NavLogo src="https://www.svgrepo.com/show/310222/weather-partly-cloudy-day.svg" alt="logo"/>
                            <NavTitle>Weather Forecasts</NavTitle>
                        </StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/cities">Cities</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/weather-stations">Weather Stations</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/weather-forecasts">Weather Forecasts</StyledLink>
                    </NavItem>
                </NavList>
            </Navbar>
        );
    }
}

const Navbar = styled.div`
    background-color: #f3f6ff;
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;

    @media (min-width: 768px) {
        padding: 0 5%;
    }
`;

const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: inherit;

    @media (max-width: 768px) {
        white-space: normal;
    }

    @media (min-width: 768px) {
        white-space: nowrap;
    }
`;

const NavItem = styled.li`
    flex: 1;
    background-color: inherit;
`;

const StyledLink = styled(NavLink)`
    background-color: inherit;
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    font-weight: 600;

    &:hover {
        background-color: #b0d7ff;
        color: black;
    }

    &.active {
        color: #000000;
        background-color: #3f9bff;
    }
`;

const NavLogo = styled.img`
    width: 50px;
    height: 50px;
    left: 0;
    background-color: inherit;
    margin: 0 5px
`;

const NavTitle = styled.h5`
    background-color: inherit;
    width: 100px;
    color: black;
    margin: 0 5px;
    white-space: normal;
    @media (max-width: 768px) {
        display: none;
    }
`;