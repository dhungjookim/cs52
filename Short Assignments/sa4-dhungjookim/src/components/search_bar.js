import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ searchterm: event.target.value });
    this.props.onSearchChange(event.target.value);
  }

  render() {
    return (
      <div>
        <input onChange={this.onInputChange} value={this.state.searchterm} />
      </div>
    );
  }
}

export default SearchBar;
