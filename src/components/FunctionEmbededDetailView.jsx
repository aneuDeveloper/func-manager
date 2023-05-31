import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { retryFunc } from "../Api";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FunctionDetailViewDiv = styled.div`
  padding: 10px;
  background-color: #FFFFFF;

  .left-col {
    display: inline-block;
    width: 200px;
  }

  .button-long {
    padding: 10px;
    width: 35px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;1
    border: none;
    border-radius: 15%;
    outline: none;
    &:hover {
      background-color: #00000015;
    }
  }
`;

export default function FunctionEmbededDetailView(props) {
  const navigate = useNavigate();
  const [formatedMessage, setformatedMessage] = useState([]);

  const back = (func) => {
    navigate("/", { replace: true });
  };

  const navigateToDetailView = (id) => {
    navigate("/functions/" + id, { replace: true });
  };

  const retry = (id) => {
    retryFunc(id);
  };

  const onFormatAsJson = () => {
    try {
      const obj = JSON.parse(props.func.data.kafka_message);
      const formattedMessage = JSON.stringify(obj, null, 2);
      return setformatedMessage(formattedMessage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FunctionDetailViewDiv>
      <h5>Details</h5>
      <div>
        <button type="button" onClick={() => retry(props.func.data.id)}>
          Retry
        </button>
        <span>&nbsp;&nbsp;</span>
        <button type="button" onClick={() => navigateToDetailView(props.func.data.id)}>
          Duplicate
        </button>
      </div>
      <div>
        <span className="left-col">Func ID</span>
        <span>{props.func.data.id}</span>
      </div>
      <div>
        <span className="left-col">Function</span>
        <span>{props.func.data.func}</span>
      </div>
      <div>
        <span className="left-col">Process name</span>
        <span>{props.func.data.process_name}</span>
      </div>
      <div>
        <span className="left-col">Process Instance Id</span>
        <span>{props.func.data.process_instanceid}</span>
        <span>
          <button type="button" onClick={onFormatAsJson}>
            + Filter
          </button>
        </span>
      </div>
      <div>
        <span className="left-col">Function Type</span>
        <span>{props.func.data.func_type}</span>
      </div>
      <div>
        <span className="left-col">Time</span>
        <span>{props.func.data.time_stamp}</span>
      </div>
      <div>&nbsp;</div>
      <div>
        <span>Message:</span>
      </div>
      <div>
        <button type="button" onClick={onFormatAsJson}>
          Format as JSON
        </button>
        <span>&nbsp;&nbsp;</span>
        <CopyToClipboard text={formatedMessage}>
          <button>Copy message to clipboard</button>
        </CopyToClipboard>
      </div>
      <div>
        <pre>
          {formatedMessage == "" && props.func.data.kafka_message}
          {formatedMessage != "" && formatedMessage}
        </pre>
      </div>
    </FunctionDetailViewDiv>
  );
}
