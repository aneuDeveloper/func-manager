import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Search extends Component {

  handleKeyPress = (event) => {
    if(event.keyCode === 13){
      this.props.onSearch()
    }
  }

  render() {
    const searchBar = (
      <div>
        <h3>Workflow manager</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by anything"
            aria-label="Find workflow"
            aria-describedby="button-addon2"
            onKeyDown={this.handleKeyPress}
          ></input>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={this.props.onSearch}
          >
            Find
          </button>
        </div>
      </div>
    );
    return searchBar;
  }
}

export default Search;
