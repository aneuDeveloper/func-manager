import React, { useRef } from "react";
import DetailedFunction from "./DetailedFunction";
import "bootstrap/dist/css/bootstrap.css";

const FunctionsSearch = (props) => {

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      props.onSearch();
    }
  };

  return (
    <div className="w-100">
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col"><h3>Find functions</h3></div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-lg-5">
            <div className="input-group col-md-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search by anything"
                aria-label="Find workflow"
                aria-describedby="button-addon2"
                onKeyDown={handleKeyPress}
              ></input>
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  props.onSearch();
                }}
              >
                Find
              </button>
            </div>
          </div>
        </div>
      </div>

      {props.stateObj.functionHitList?.functions?.map((functionHit) => (
        <div className="container-fluid">
          {!functionHit?.workflowFunctionsVisible && (
            <div className="row align-items-center border-bottom p-3 hitRow">
              <div className="col-md-1 link-primary" onClick={() => props.onOpenWorkflow(functionHit)}>
                {functionHit.data.process_name}
              </div>
              <div className="col-md-1">
                {functionHit.data.func}
              </div>
              <div className="col-md-1">
                {functionHit.data.time_stamp}
              </div>
              <div className="col-md-1">
                <span className="badge rounded-pill text-bg-secondary">{functionHit.data.func_type}</span>
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


      {(props.stateObj.functionHitList == null || props.stateObj.functionHitList?.functions?.length <= 0) && (
        <div className="container-fluid">
          Nothing to show.
        </div>
      )}
    </div>
  );
};

export default FunctionsSearch;
