import styled from "styled-components";
import { useNavigate, useParams, defer, useLoaderData } from "react-router-dom";
import getApiBase from "../config";
import React, { useState } from "react";
import axios from "axios";
import { submitFunction } from "../services/funcService";
import { useRef } from "react";

const FunctionDetailViewDiv = styled.div`
  padding: 10px;
  background-color: #ffffff;

  .left-col {
    display: inline-block;
    width: 200px;
  }

  .button-long {
    padding-top: 6px;
    width: 35px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 50%;
    outline: none;
    &:hover {
      background-color: #00000015;
    }
  }
`;

export const functionLoader = async ({ params }) => {
  console.log("Get function with json=" + JSON.stringify(params));
  const baseApiUrl = getApiBase();
  const response = await axios.get(baseApiUrl + "function/" + params.funcId, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const functionResponse = response.data.result;
  console.log("Got result json=" + JSON.stringify(functionResponse));
  return defer(functionResponse);
};

export default function FuncEditView(props) {
  const funcObj = useLoaderData();
  // const  funcObj  = {};
  const navigate = useNavigate();
  const params = useParams();
  const kafkaMessageRef = useRef(null);

  const back = () => {
    navigate("/", { replace: true });
  };

  const sendFunc = async (funcObj) => {
    const kafkaMessageValue = kafkaMessageRef.current.value;

    submitFunction({
      source_topic: funcObj.source_topic,
      kafka_message: kafkaMessageValue,
      processName: "",
      processInstanceID: "",
      func: "",
      func_type: "",
      comingFromId: "",
    });
  };

  return (
    <FunctionDetailViewDiv>
      <div className="rounded-button" onClick={back} title="Back">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>

      <h5>Modify and Retry</h5>
      <div>
        <span className="left-col">Func ID</span>
        <span>
          <input type="text" id="fname" name="fname" value={params.funcId} size="30" />
        </span>
      </div>
      <div>
        <span className="left-col">Function Name</span>
        <span>
          <input type="text" id="func" name="func" value={funcObj.func} size="30" />
        </span>
      </div>
      <div>
        <span className="left-col">Process name</span>
        <span>
          <input type="text" id="func" name="func" value={funcObj.process_name} size="30" />
        </span>
      </div>
      <div>
        <span className="left-col">Process Instance Id</span>
        <span></span>
      </div>
      <div>
        <span className="left-col">Function Type</span>
        <span></span>
      </div>
      <div>
        <span className="left-col">Time</span>
        <span></span>
      </div>

      <div>Message:</div>
      <div>
        <textarea id="message" name="message" rows="4" cols="200" ref={kafkaMessageRef}>
          {funcObj.kafka_message}
        </textarea>
      </div>
      <div>&nbsp;&nbsp;</div>
      <button
        type="button"
        onClick={() => {
          sendFunc(funcObj);
        }}
      >
        Send
      </button>
    </FunctionDetailViewDiv>
  );
}
