import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
const config = require("./config.json");

class DetailedFunction extends Component {
  messageRef = React.createRef();

  // constructor(props) {
  //   super(props);
  //   this.messageRef = React.createRef();
  // }

  formatJson = (text) => {
    return JSON.stringify(JSON.parse(text), null, 4);
  };

  submitFunction = async (func) => {
    let messageBody = this.messageRef.current.value
    console.log("onOpenWorkflow called " + func.id + " and body=" + messageBody);
    let url =
      config.BASE_API_URL +
      `submitFunction?source_topic=${func.source_topic}` +
      `&processName=${func.process_name}` +
      `&processInstanceID=${func.process_instanceid}` +
      `&func=${func.func}` +
      `&func_type=${func.func_type}`;
    if (func.coming_from_id != null) {
      url += `&comingFromId=${func.coming_from_id}`;
    }

    try {
      console.log(messageBody);
      const response = await axios.post(url, messageBody, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    let func = this.props.func;

    return (
      <div>
        <div className="row align-items-center p-3">
          <div className="col-md-1">
            {func.time_stamp}
          </div>
          <div className="col-md-1">
            {func.func != null && func.func}
          </div>
          <div className="col-md-2">
            <span className="badge rounded-pill text-bg-secondary">{func.func_type}</span>
          </div>
          {func.func_type == "WORKFLOW" && (
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => this.submitFunction(func, func.data)}
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
            <textarea
              ref={this.messageRef}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="12"
              value={this.props.func.data}
            />
          </div>
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => this.submitFunction(func)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedFunction;
