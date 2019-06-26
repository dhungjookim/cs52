import React, { Component } from 'react';
import styled from 'styled-components';

const Search = styled.div`
  margin-bottom: 20px;
`;
const Input = styled.input`
  font-size: 1.5em;
  border-radius: .25em;
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ searchterm: event.target.value });
    this.props.onSearchChange(event.target.value);
    console.log(event.target.value);
  }

  render() {
    return (
      <Search>
        <Input onChange={this.onInputChange} value={this.state.searchterm} />
      </Search>
    );
  }
}


export default SearchBar;
