import { useState, useEffect } from "react"
import { useLocation, useLoaderData, defer } from "react-router-dom"
import api from "./../Api"
import styled from "styled-components"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"

const ProcessSearchViewDiv = styled.div`
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

export const searchLoader = async ({ request }) => {
  const url = new URL(request.url)
  const data = JSON.parse(url.searchParams.get("data"))

  // console.log("search for freetext=", data.freetext)

  const response = await api({
    method: "POST",
    data: data,
    withCredentials: false,
    url: "/processes/search",
  }).catch(function (error) {
    console.log("error ", error)
  })

  const result = new Array()
  for (const process of response.data.result) {
    const parentChildSteps = new Map()
    let rootElement = null

    for (const step of process.steps) {
      if (step.coming_from_id == null) {
        rootElement = step
      } else {
        // TODO: add as list
        parentChildSteps.set(step.coming_from_id, step)
      }
    }

    for (const step of process.steps) {
      const childOfStep = parentChildSteps.get(step.id)
      if (childOfStep != null) {
        Object.assign(step, { child: childOfStep })
      }
    }
    const sortedSteps = new Array()
    sortedSteps.push(rootElement)
    Object.assign(rootElement, { child: parentChildSteps.get(rootElement.id) })
    var currentStep = rootElement
    for (var i = 0; i < process.steps.length && currentStep.child != null; i++) {
      sortedSteps.push(currentStep.child)
      currentStep = currentStep.child
    }
    process.steps = sortedSteps

    let lastProcessType = null
    if (process.steps != null && process.steps.length > 0) {
      lastProcessType = process.steps[process.steps.length - 1].type
    }

    Object.assign(process, { clientId: Date.now().toString(36) + Math.random().toString(36).slice(2) })
    Object.assign(process, { lastProcessType: lastProcessType })
    result.push(process)
  }

  // flaten tree, sort parent child (coming_from to id)

  return defer({
    processes: result,
    message: "",
  })
}

export default function SearchView(props) {
  const loaderData = useLoaderData()
  const [searchResult, setSearchResult] = useState(loaderData)

  useEffect(() => {
    setSearchResult(loaderData)
  }, [loaderData])

  const openCloseProcess = (process) => {
    var result = { ...searchResult }
    for (const processInLoop of result.processes) {
      if (processInLoop.clientId == process.clientId) {
        processInLoop.viewOpened = !processInLoop.viewOpened
      }
    }
    setSearchResult(result)
  }

  const repeat = (step) => {}

  return (
    <div>
      <div>
        <div className="rounded-button" title="Refresh">
          <button type="button" className="btn btn-light d-flex align-items-center gap-2">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>

        {searchResult?.processes?.map((process) => (
          <div>
            <div className="row">
              <div className="col-auto d-flex align-items-center" style={{ width: "85px" }}>
                <button type="button" className="btn btn-light d-flex align-items-center gap-2" onClick={() => openCloseProcess(process)}>
                  <span>{process.viewOpened ? <i class="bi bi-caret-down"></i> : <i className="bi bi-caret-right"></i>}</span>

                  <span className="badge rounded-pill text-bg-primary" title="Process steps executed including end">
                    {process.steps.length}
                  </span>
                </button>
              </div>
              <div className="col-auto d-flex align-items-center" style={{ width: "50px" }}>
                {process.lastProcessType == "END" ? (
                  <i className="bi bi-check-lg text-success" title="Process finished."></i>
                ) : process.lastProcessType == "ERROR" ? (
                  <i className="bi bi-exclamation-triangle text-danger"></i>
                ) : (
                  <i className="bi spinner-border spinner-border-sm text-primary"></i>
                )}
              </div>
              <div className="col d-flex align-items-center">{process.process_name}</div>
            </div>

            {process.viewOpened &&
              process.steps?.map((step, index) => (
                <div className="row">
                  <div className="col d-flex align-items-center">{step.id}</div>
                  <div className="col d-flex align-items-center">{step.type}</div>
                  <div className="col d-flex align-items-center">{step.function}</div>
                  <div className="col d-flex align-items-center">{step.timestamp}</div>
                  <div className="col d-flex align-items-center">{step.message}</div>
                  <div className="col d-flex align-items-center">
                    {step.type != "END" && (
                      <button type="button" className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={() => repeat(step)}>
                        <i class="bi bi-arrow-repeat"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
