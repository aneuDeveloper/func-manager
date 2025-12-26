import { useState, useEffect } from "react"
import { useLocation, useLoaderData, defer } from "react-router-dom"
import api from "./../Api"
import styled from "styled-components"

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

  // flaten tree, sort parent child (coming_from to id)
  const parentChild = new Map()
  for (const process of response.data.result) {
    parentChild.set(process.coming_from_id, process)
  }

  let rootElement = null
  for (const process of response.data.result) {
    if (parentChild.get(process.id) == null) {
      rootElement = process
      break
    }
  }

  const result = new Array()
  function traverse(parentId) {
    const children = parentChild.get(parentId) ?? []
    for (const child of children) {
      result.push(child)
      traverse(child.id)
    }
  }
  traverse(rootElement) // start from root items
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

  return (
    <div>
      <div>
        <div className="rounded-button" title="Refresh">
          <span className="material-symbols-outlined">refresh</span>
        </div>

        {searchResult?.processes?.map((process) => (
          <ProcessSearchViewDiv>
            <span className="rounded-button" title="Open detail">
              <span className="material-symbols-outlined">
                {process.viewOpened && "expand_more"}
                {!process.viewOpened && "chevron_right"}
              </span>
            </span>
            <div>{process.process_name}</div>

            {process.steps?.map((step) => (
              <div>{step.message}</div>
            ))}
          </ProcessSearchViewDiv>
        ))}
      </div>
    </div>
  )
}
