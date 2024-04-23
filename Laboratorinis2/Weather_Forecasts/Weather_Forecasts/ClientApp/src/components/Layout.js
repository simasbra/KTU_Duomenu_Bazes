import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import styled from "styled-components";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
    padding: 10px 20px;
    margin: 50px 5%;
    overflow-x: clip;
    align-content: center;
    
    @media (max-width: 1536px) {
        margin: 50px 0;
    }
`;