import styled from "styled-components";
import { useNavigate, useParams, defer, useLoaderData } from "react-router-dom";
import getApiBase from "../config";
import React, { useState } from "react";
import axios from "axios";
import { submitFunction } from "../services/funcService";
import { useRef } from "react";
import { toast } from "react-toastify";

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
  const response = await axios.get(baseApiUrl + "functions/" + params.funcId, {
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
  const navigate = useNavigate();
  const params = useParams();
  const kafkaMessageRef = useRef(null);
  const processNameRef = useRef(null);
  const processInstanceIdRef = useRef(null);
  const functionTypeRef = useRef(null);
  const functionRef = useRef(null);
  const comingFromFunctionIdRef = useRef(null);
  const back = () => {
    navigate("/", { replace: true });
  };

  const sendFunc = async (funcObj) => {
    const kafkaMessageValue = kafkaMessageRef.current.value;

    try {
      await submitFunction({
        source_topic: funcObj.source_topic,
        kafka_message: kafkaMessageValue,
        processName: processNameRef.current.value,
        processInstanceID: processInstanceIdRef.current.value,
        func: functionRef.current.value,
        func_type: functionTypeRef.current.value,
        comingFromId: comingFromFunctionIdRef.current.value,
      });
      toast.success("Function created.");
    } catch (error) {
      toast.error("error");
    }
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
          <input type="text" id="fname" name="fname" defaultValue={funcObj.id} size="30" />
        </span>
      </div>
      <div>
        <span className="left-col">Function</span>
        <span>
          <input type="text" id="func" name="func" defaultValue={funcObj.func} size="30" ref={functionRef} />
        </span>
      </div>
      <div>
        <span className="left-col">Process name</span>
        <span>
          <input type="text" id="func" name="func" defaultValue={funcObj.process_name} size="30" ref={processNameRef} />
        </span>
      </div>
      <div>
        <span className="left-col">Process Instance Id</span>
        <span>
          <input type="text" id="func" name="func" defaultValue={funcObj.process_instanceid} size="30" ref={processInstanceIdRef} />
        </span>
      </div>
      <div>
        <span className="left-col">Function Type</span>
        <span>
          <input type="text" id="func" name="func" defaultValue={funcObj.func_type} size="30" ref={functionTypeRef} />
        </span>
      </div>
      <div>
        <span className="left-col">Coming from funtion id</span>
        <span>
          <input type="text" id="func" name="func" defaultValue={funcObj.coming_from_id} size="30" ref={comingFromFunctionIdRef} />
        </span>
      </div>
      <div>
        <span className="left-col">Time</span>
        <span>{funcObj.time_stamp}</span>
      </div>

      <div>Message:</div>
      <div>
        <textarea id="message" name="message" rows="4" cols="150" ref={kafkaMessageRef} defaultValue={funcObj.kafka_message} />
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
