import React, { Component } from "react";
import Search from "./search/search";
import axios from "axios";
import config from "./config.json";

class App extends Component {
  state = {
    processes: [],
  };

  componentDidMount() { }

  exeSearch = async () => {
    console.log("Search for functions")
    const response = await axios.get(config.BASE_API_URL + "functions/search");
    const workflowList = response.data.result;

    for (let workflow of workflowList) {
      let timeStamp = new Date(new Number(workflow.time_stamp));
      workflow.time_stamp = timeStamp.toLocaleString();
    }

    this.setState({ processes: workflowList });
  };

  exeListFunctions = async (process) => {
    const response = await axios.get(
      config.BASE_API_URL +
      "workflow/" +
      process.process_instanceid +
      "/functions"
    );
  };

  render() {
    return (
      <div>
        <div className="container text-center">
          <div className="row">
            <Search onSearch={this.exeSearch} />

          </div>
        </div>

        {this.state.processes.map((process) => (
          <div className="container">
            <div className="row align-items-center border-bottom p-3">
              <div className="col">
                {process.func}
              </div>
              <div className="col">
                {process.time_stamp}
              </div>
              <div className="col">
                {process.process_name}
              </div>
              <div className="col">
                {process.func_type}
              </div>

              <div className="col">

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => this.exeListFunctions(process)}
                >
                  Open Workflow
                </button>
              </div>
            </div>
          </div>
        ))}


      </div>
    );
  }
}

export default App;
