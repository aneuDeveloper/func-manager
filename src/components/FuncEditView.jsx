import React, { useRef } from "react";
import { defer, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getFunction, submitFunction } from "../Api";

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
  console.log("Load function=" + JSON.stringify(params));
  const func = await getFunction(params.funcId);
  console.log("Got result json=" + JSON.stringify(func));
  return defer(func);
};

export default function FuncEditView(props) {
  const funcObj = useLoaderData();
  const navigate = useNavigate();
  const kafkaMessageRef = useRef(null);
  const processNameRef = useRef(null);
  const processInstanceIdRef = useRef(null);
  const functionTypeRef = useRef(null);
  const functionRef = useRef(null);
  const comingFromFunctionIdRef = useRef(null);
  const topicRef = useRef(null);
  const back = () => {
    navigate(-1)
  };

  const sendFunc = async (funcObj) => {
    const kafkaMessageValue = kafkaMessageRef.current.value;

    try {
      await submitFunction({
        source_topic: topicRef.current.value,
        kafka_message: kafkaMessageValue,
        processName: processNameRef.current.value,
        processInstanceID: processInstanceIdRef.current.value,
        func: functionRef.current.value,
        func_type: functionTypeRef.current.value,
        comingFromId: comingFromFunctionIdRef.current.value,
      });
      toast.success("Function created.");
    } catch (error) {
      console.info("error info: " + JSON.stringify(error));
      if (error["message"] == null) {
        toast.error("Error occured");
      } else {
        toast.error("Error message: " + error["message"]);
      }
    }
  };

  return (
    <FunctionDetailViewDiv>
      <div className="rounded-button" onClick={back} title="Back">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>

      <h5>Modify and Retry</h5>
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
        <span className="left-col">Topic</span>
        <span>
          <input type="text" id="func" name="func" defaultValue={funcObj.source_topic} size="30" ref={topicRef} />
        </span>
      </div>
      <div>
        <span className="left-col">Time</span>
        <span>{funcObj.time_stamp}</span>
      </div>

      <div>Message:</div>
      <div>
        <textarea id="message" name="message" rows="15" cols="150" ref={kafkaMessageRef} defaultValue={funcObj.kafka_message} />
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
