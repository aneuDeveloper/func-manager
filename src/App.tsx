import React, { Component } from "react";
import FunctionsSearch from "./FunctionsSearch";
import { FunctionHitList, FunctionHit } from "./model";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
const config = require("./config.json");

class App extends Component {
  state = {};

  componentDidMount() { }

  exeSearch = async () => {
    console.log("Search for functions");
    const response = await axios.get(config.BASE_API_URL + "functions/search");
    const functionResponseList = response.data.result;
    let funcArr = [];
    for (let functionResponse of functionResponseList) {
      // let timeStamp = new Date(new Number(workflow.time_stamp));
      let timeStamp = new Date(Number(functionResponse.time_stamp));
      functionResponse.time_stamp = timeStamp.toLocaleString();

      const functionHit = new FunctionHit();
      functionHit.data = functionResponse;
      funcArr.push(functionHit);

      console.log("push " + functionHit);
    }

    const functionHitList = new FunctionHitList();
    functionHitList.functions = funcArr;

    this.setState({
      functionHitList: functionHitList,
    });
  };

  onOpenWorkflow = async (functionHit: FunctionHit) => {
    console.log("onOpenWorkflow called " + functionHit.data.id);
    const response = await axios.get(
      config.BASE_API_URL + "workflow/" + functionHit.data.process_instanceid + "/functions"
    );
    functionHit.workflowFunctions = response.data.result;
    for (let func of functionHit.workflowFunctions) {
      let timeStamp = new Date(Number(func.time_stamp));
      func.time_stamp = timeStamp.toLocaleString();
    }
    functionHit.workflowFunctionsVisible = true;

    this.setState(this.state);
  };

  onSubmitFunction = async (func: any, body: string) => {
    console.log("onOpenWorkflow called " + func.id);
    let url =
      config.BASE_API_URL +
      `submitFunction?source_topic=${func.source_topic}` +
      "&processName=" +
      func.process_name +
      "&processInstanceID=" +
      func.process_instanceid +
      "&func=" +
      func.func +
      "&func_type=" +
      func.func_type;
    if (func.coming_from_id != null) {
      url += "&comingFromId=${func.coming_from_id}";
    }

    try {
      console.log(body);
      const response = await axios.post(url, body);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="w-100">
        <FunctionsSearch
          key="functionSearchKey"
          onSearch={this.exeSearch}
          stateObj={this.state}
          onOpenWorkflow={this.onOpenWorkflow}
          onSubmitFunction={this.onSubmitFunction}
        />
      </div>
    );
  }
}

export default App;
