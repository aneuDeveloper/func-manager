import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";

const FunctionsSearch = (props) => {
  let ref = useRef(null)

  const handleKeyPress = event => {
    if (event.keyCode === 13) {
      props.onSearch();
    }
  };

  const onEditedSend = innerWorkflowFunction => {
    console.log("value was " + ref.current.value);
    props.onSubmitFunction(innerWorkflowFunction, ref.current.value)
  };

  return (
    <div className="w-100">
      <div className="container-fluid text-center">
        <div className="row">
          <div>
            <h3>Find functions</h3>
            <div className="input-group mb-3">
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
                onClick={()=> {props.onSearch()}}
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
            <div className="row align-items-center border-bottom p-3">
              <div className="col">
                <div className="fs-4 link-primary" onClick={() => props.onOpenWorkflow(functionHit)}>
                  {functionHit.data.process_name} • {functionHit.data.func}
                </div>
                <div>
                  <span className="fs-6">{functionHit.data.time_stamp} </span>
                  <span className="badge rounded-pill text-bg-secondary">{functionHit.data.func_type}</span>
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
                  <div>
                    <div className="row align-items-center p-3">
                      <div className="col-md-2">{innerWorkflowFunction.time_stamp + " • "}{innerWorkflowFunction.func != null && innerWorkflowFunction.func}</div>
                      <div className="col-md-2"><span className="badge rounded-pill text-bg-secondary">{innerWorkflowFunction.func_type}</span></div>
                      {innerWorkflowFunction.func_type == "WORKFLOW" && (
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => props.onSubmitFunction(innerWorkflowFunction, innerWorkflowFunction.data)}
                          >
                            Repeat
                          </button>{" "}
                          <button type="button" className="btn btn-outline-primary">
                            Edit Before Repeat
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="row align-items-center p-3">
                      <div className="col-md-12">
                      {/* {JSON.stringify(JSON.parse(innerWorkflowFunction.data), null, 4)} */}
                        <textarea ref={ref} className="form-control" id="exampleFormControlTextarea1" rows="12">{innerWorkflowFunction.data}</textarea>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => onEditedSend(innerWorkflowFunction)}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FunctionsSearch;
