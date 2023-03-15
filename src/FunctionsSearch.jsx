import React, { Component } from "react";
import DetailedFunction from "./DetailedFunction";
import "bootstrap/dist/css/bootstrap.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';

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
                  <DropdownButton
                    as={ButtonGroup}
                    // key={idx}
                    id={`dropdown-button-drop-${functionHit.id}`}
                    size="sm"
                    variant="secondary"
                    title="Drop small"
                  >
                    <Dropdown.Item eventKey="1">Retry</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Duplicate</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Open process</Dropdown.Item>
                  </DropdownButton>
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
      </div>
    );
  }
}

export default FunctionsSearch;
