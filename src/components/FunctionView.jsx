import { FunctionHit } from "../model/FunctionHit"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import FunctionEmbededDetailView from "./FunctionEmbededDetailView"

const FunctionDiv = styled.div`
  background-color: #c9cdd3;
  border-color: #bdc3cb;
  border-bottom-style: solid;
  border-bottom-width: 1px;

  &:hover {
    border-color: #9fa5ac;
    cursor: pointer;
  }
`

const PreviewFunctionDiv = styled.div`
  font-size: 0.875rem;
  display: flex;

  .process-name-div {
    padding-top: 6px;
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
    padding-top: 6px;
    width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 7;
    flex-shrink: 2;
    flex-basis: 0;
  }
`

const FunctionControl = styled.div`
  text-align: right;
  display: block;
  display: none;

  ${FunctionDiv}:hover & {
    display: flex;
  }
`

export default function Function(props) {
  const navigate = useNavigate()
  const [detailVisible, setDetailVisible] = useState(false)

  const showDetailView = (func) => {
    navigate("/functions/" + func.data.id, { replace: true })
  }

  const expandDetail = () => {
    setDetailVisible(!detailVisible)
  }

  return (
    // <FunctionDiv onClick={() => showDetailView(props.func)}>
    <FunctionDiv>
      <PreviewFunctionDiv onClick={expandDetail}>
        <span className="rounded-button" onClick={expandDetail} title="Open detail">
          <span className="material-symbols-outlined">
            {detailVisible && "expand_more"}
            {!detailVisible && "chevron_right"}
          </span>
        </span>
        <div className="process-name-div">{props.func.data.process_name}</div>
        <div className="process-name-div">{props.func.data.func}</div>
        <div className="func-message-div">{props.func.data.kafka_message}</div>
      </PreviewFunctionDiv>
      {detailVisible && <FunctionEmbededDetailView func={props.func}  />}
    </FunctionDiv>
  )
}
