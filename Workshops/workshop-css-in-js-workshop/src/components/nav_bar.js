/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
border: 2px solid #F05252;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
margin: 2em 0;
padding: 2em 2em;
border-radius: 3px;
`;
const Button = styled.button`
color: white;
padding: 0 2em;
margin: 0 1em;
background: #F05252;
border: 2px solid #F05252;
border-radius: 3px;
`;
const List = styled.ul`
display: flex;
flex-direction: row;
justfy-content: space-around;
list-style-type: none;
margin: 0em 2em;
`;

const ListItem2 = styled(Button)`
color: #F05252;
background: white;
&:hover {
    background-color: #F05252;
    color: #FFFFFF;
  }
  `;

class NavBar extends Component {
  render() {
    return (
      <Bar>
        <Button>MyTube</Button>
        <List>
          <ListItem2 as="a" href="/">Home</ListItem2>
          <ListItem2 as="a" href="/">About</ListItem2>
          <ListItem2 as="a" href="/">FAQ</ListItem2>
          <ListItem2 as="a" href="/">Contact</ListItem2>
        </List>
      </Bar>
    );
  }
}

export default NavBar;
