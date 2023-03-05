import React, { Component } from "react";
import FunctionsSearch from "./FunctionsSearch";
import { FunctionHitList, FunctionHit } from "./model";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css'
import getApiBase from './config'
class App extends Component {
  state = {}

  componentDidMount() {
  }

  exeSearch = async () => {
    console.log("Search for functions");
    try {

      const baseApiUrl = getApiBase()
      const response = await axios.get(baseApiUrl + "functions/search");
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
    } catch (error: any) {
      toast.error(error);
    }

  };

  onOpenWorkflow = async (functionHit: FunctionHit) => {
    console.log("onOpenWorkflow called " + functionHit.data.id);
    const response = await axios.get(
      getApiBase() + "workflow/" + functionHit.data.process_instanceid + "/functions"
    );
    functionHit.workflowFunctions = response.data.result;
    for (let func of functionHit.workflowFunctions) {
      let timeStamp = new Date(Number(func.time_stamp));
      func.time_stamp = timeStamp.toLocaleString();
    }
    functionHit.workflowFunctionsVisible = true;

    this.setState(this.state);
  };

  render() {
    return (
      <div className="w-100">
        <ToastContainer />
        <FunctionsSearch
          key="functionSearchKey"
          onSearch={this.exeSearch}
          stateObj={this.state}
          onOpenWorkflow={this.onOpenWorkflow}
        />
      </div>
    );
  }
}

export default App;
