import React, { Component } from "react";
import DetailedFunction from "./DetailedFunction";
// import "bootstrap/dist/css/bootstrap.css";

class FunctionsSearch extends Component {
  freetextMessageRef = React.createRef();

  handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      this.search();
    }
  };

  search = () => {
    let freetextValue = this.freetextMessageRef.current.value;
    this.props.onSearch(freetextValue);
  };

  render() {
    return (
      <div className="w-100">
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col">
              <h3>Find functions</h3>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col col-lg-5">
              <div className="input-group col-md-auto">
                <input
                  ref={this.freetextMessageRef}
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
                  onClick={() => {
                    this.search();
                  }}
                >
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>

        {this.props.stateObj.functionHitList?.functions?.map((functionHit) => (
          <div className="container-fluid">
            <div className="row align-items-center border-bottom p-3 hitRow">
              <div className="col-md-1">Prozess</div>
              <div className="col-md-1">Funktion</div>
              <div className="col-md-1">Datum</div>
              <div className="col-md-1">Typ</div>
              <div className="col-md-1">Aktion</div>
            </div>

            {!functionHit?.workflowFunctionsVisible && (
              <div className="row align-items-center border-bottom p-3 hitRow">
                <div className="col-md-1 link-primary" onClick={() => this.props.onOpenWorkflow(functionHit)}>
                  {functionHit.data.process_name}
                </div>
                <div className="col-md-1">{functionHit.data.func}</div>
                <div className="col-md-1">{functionHit.data.time_stamp}</div>
                <div className="col-md-1">
                  <span className="badge rounded-pill text-bg-secondary">{functionHit.data.func_type}</span>
                </div>

                <div className="col-md-1">
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" onClick={() => console.log("retry clicked")}>Retry</a>
                      <a className="dropdown-item" href="#2">Another action</a>
                      <a className="dropdown-item" href="#3">Something else here</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {functionHit?.workflowFunctionsVisible && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {functionHit.data.process_name} • {functionHit.data.process_instanceid}
                  </h5>
                  {functionHit?.workflowFunctions?.map((innerWorkflowFunction) => (
                    <DetailedFunction func={innerWorkflowFunction} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {(this.props.stateObj.functionHitList == null ||
          this.props.stateObj.functionHitList?.functions?.length <= 0) && (
            <div className="container-fluid">Nothing to show.</div>
          )}


        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default FunctionsSearch;
