import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export class NavMenu extends Component {
    render() {
        return (
            <Navbar>
                <NavLogo src="https://www.svgrepo.com/show/310222/weather-partly-cloudy-day.svg" alt="logo"/>
                <NavTitle>Weather Forecasts</NavTitle>
                <NavList>
                    <NavItem>
                        <StyledLink to="/" exact>Home</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/cities">Cities</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/stations">Weather Stations</StyledLink>
                    </NavItem>
                    <NavItem>
                        <StyledLink to="/forecasts">Weather Forecasts</StyledLink>
                    </NavItem>
                </NavList>
            </Navbar>
        );
    }
}

const Navbar = styled.div`
    background-color: #f0f0f0;
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    padding: 0 5%;
`;

const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    width: 100%;
    height: 100%;
    margin: 0;
    white-space: nowrap;
    background-color: inherit;
    padding: 0 5%;
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

    &:hover {
        background-color: lightgrey;
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
    margin: 0;
    margin: 0 5px
`;