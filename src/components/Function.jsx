import { FunctionHit } from "../model/FunctionHit";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FunctionDiv = styled.div`
  padding: 6px 0 6px;
  font-size: 0.875rem;
  display: flex;
  background-color: #c9cdd3;
  border-color: #bdc3cb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  &:hover {
    border-color: #9fa5ac;
    cursor: pointer;
  }

  .process-name-div {
    padding-left: 5px;
    font-weight: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }

  .func-message-div {
    width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 7;
    flex-shrink: 2;
    flex-basis: 0;
  }
`;

const FunctionControl = styled.div`
  text-align: right;
  display: block;
  display: none;

  ${FunctionDiv}:hover & {
    display: flex;
  }
`;

export default function Function(props) {
  const navigate = useNavigate();

  const showDetailView = (func) => {
    navigate("/functions/"+func.data.id, { replace: true });
  };

  return (
    <FunctionDiv onClick={() => showDetailView(props.func)}>
      <div className="process-name-div">{props.func.data.process_name}</div>
      <div className="process-name-div">{props.func.data.func}</div>
      <div className="func-message-div">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
        Lorem Ipsum
      </div>
      <FunctionControl>controls</FunctionControl>
    </FunctionDiv>
  );
}
