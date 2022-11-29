import React, { Component } from "react";
import axios from "axios";

const config = require("./config.json");

class DetailedFunction extends Component {
  state = {
    messageBody: "",
  };

  componentDidMount() {
    this.setState({
      messageBody: this.props.func.data,
    });
  }
  formatJson = (text) => {
    return JSON.stringify(JSON.parse(text), null, 4);
  };

  onTextAreaChange = (e) => {
    this.state.messageBody = e.currentTarget.value;
    this.setState(this.state);
  };

  submitFunction = async (func, messageBody) => {
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
      console.log(error);
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
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="12"
              value={this.state.messageBody}
              onChange={this.onTextAreaChange}
            />
          </div>
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => this.submitFunction(func, this.state.messageBody)}
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
