import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { newFunction } from "../Api2";
import { useState, useRef } from "react";

const FormDiv = styled.div`
  padding-left: 10px;
`;

const TitleColDiv = styled.div`
  width: 250px !important;
`;
const TitleColDivCss = "col-auto d-flex align-items-center mb-3";

export default function NewFunctionView({ func, onCancel }) {
  const navigate = useNavigate();
  const [formatedMessage, setformatedMessage] = useState();

  const kafkaMessageRef = useRef(null);
  const processNameRef = useRef(null);
  const process_instance_idRef = useRef(null);
  const functionRef = useRef(null);
  const coming_from_idRef = useRef(null);

  const back = () => {
    onCancel();
  };

  const onSend = async (aFunc) => {
    let func = {
      process_name: processNameRef.current.value,
      process_instance_id: process_instance_idRef.current.value,
      func: functionRef.current.value,
      coming_from_id: aFunc.id,
      to_topic: aFunc.from_topic,
      kafka_message: kafkaMessageRef.current.value,
    };
    try {
      await newFunction(func);
      setformatedMessage(null);
      onCancel();
    } catch (e) {
      setformatedMessage(e.message);
    }
  };

  const onFormatAsJson = () => {
    // try {
    //   const obj = JSON.parse(function.data.kafka_message);
    //   const formattedMessage = JSON.stringify(obj, null, 2);
    //   return setEventMessage(formattedMessage);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <FormDiv>
      <h5>Details</h5>
      <div className="row">
        <TitleColDiv className={TitleColDivCss}>Process Name:</TitleColDiv>
        <div className="col align-items-center">
          <input type="text" value={func.process_name} ref={processNameRef} style={{ width: "100%" }} />
        </div>
      </div>
      <div className="row">
        <TitleColDiv className={TitleColDivCss}>Process Instance Id:</TitleColDiv>
        <div className="col align-items-center">
          <input type="text" value={func.process_instance_id} ref={process_instance_idRef} style={{ width: "100%" }} />
        </div>
      </div>
      <div className="row">
        <TitleColDiv className={TitleColDivCss}>Coming from Function Id:</TitleColDiv>
        <div className="col align-items-center">
          <input type="text" value={func.coming_from_id} ref={coming_from_idRef} style={{ width: "100%" }} />
        </div>
      </div>
      <div className="row">
        <TitleColDiv className={TitleColDivCss}>Function:</TitleColDiv>
        <div className="col align-items-center">
          <input type="text" value={func.func} ref={functionRef} style={{ width: "100%" }} />
        </div>
      </div>
      <div>
        <pre></pre>
        <textarea id="message" name="message" rows="20" cols="150" ref={kafkaMessageRef} defaultValue={func.message} />
      </div>
      {formatedMessage && <div className="alert alert-danger">{formatedMessage}</div>}
      <button type="button" className="btn btn-outline-primary" onClick={back}>
        Cancel
      </button>
      &nbsp;&nbsp;&nbsp;
      <button type="button" className="btn btn-primary" onClick={() => onSend(func)}>
        Send
      </button>
    </FormDiv>
  );
}
