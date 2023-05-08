import React, { createContext, useState, setState } from "react"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { FunctionHit } from "./model/FunctionHit"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import getApiBase from "./config"
import styled from "styled-components"
import Header from "./components/Header"
import { getFromStorage, saveToStorage } from "./utils/storage"
import AppContext from "./AppContext"
import FunctionView from "./components/FunctionView"
import FuncEditView, { functionLoader } from "./components/FuncEditView"

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    --leftColumnWidth: 200px;
    flex: 1;
    background-color: #53678A;

    .body {
      flex: 1;
      display: flex;
      width: 100%;

      .left-column {
        position: relative;
        z-index: 1;
        transition: visibility 300ms, opacity 300ms, transform 300ms, width 300ms;

        &--hidden {
          opacity: 0;
          transform: translateX(-301px);
          width: 0;
          visibility: hidden;
        }

        &--show {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
          width: var(--leftColumnWidth);
          transition: transform 300ms, width 300ms;
        }
      }

      .left-column {
        width: var(--leftColumnWidth);
      }

      .right-column {
        flex: 1;
        width: 100%;
        background-color: #DCE0E6;
        border-radius: 10px;

        .str-chat,
        .str-chat__container {
          border-radius: 10px;
          height: 100%;
        }

        .str-chat-channel {
          height: 100%;
        }

        .str-chat.messaging {
          background-color: white;
        }

        .str-chat__date-separator {
          display: none;
        }
      }

      .left-menu-item-inactive {
        position: relative;
        padding-right: 10px;
        margin-right: 10px;
        &:hover {
          background-color: #7786A2;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
        }
        font-weight: normal;
      }

      .left-menu-item-active {
        position: relative;
        padding-right: 10px;
        margin-right: 10px;
        background-color: #8795AD;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        font-weight: bold;
      }

      .left-menu-icon {
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: transparent;
        color: #FFFFFF;
        border: 0;
        font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        font-size: 14px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        outline: 0;
        font-weight: inherit;
      }
      
      .material-symbols-rounded {
        display: flex;
        align-items: center;
        padding-right: 10px;
        padding-left: 5px;
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
      }
    }
  }

  .rounded-button {
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
  }

  .middle-this {
    margin: auto;
    width: 50%;
    text-align: center;
  }
`

const spacesListStatusFromStorage = getFromStorage("is_spaces_list_open")

export default function App() {
  const [functions, setFunctions] = useState([])

  const onSearch = async (freetext) => {
    console.log("Search for text=" + freetext)
    try {
      const baseApiUrl = getApiBase()

      const response = await axios.post(baseApiUrl + "functions/search", JSON.stringify({ freetext: freetext }), {
        headers: {
          "Content-Type": "application/json",
        },
      })

      const functionResponseList = response.data.result
      let funcArr = []
      for (let functionResponse of functionResponseList) {
        let timeStamp = new Date(Number(functionResponse.time_stamp))
        functionResponse.time_stamp = timeStamp.toLocaleString()

        const functionHit = new FunctionHit()
        functionHit.data = functionResponse
        functionHit.detailVisible = false
        funcArr.push(functionHit)
      }

      setFunctions(funcArr)
    } catch (error) {
      toast.error(error)
    }
  }

  const expand = async (funcId) => {
    let funcArr = []
    for (let func of functions) {
      if (func.data.id == funcId) {
        func.detailVisible = !func.detailVisible
        funcArr.push(func)
      } else {
        funcArr.push(func)
      }
    }
    setFunctions(funcArr)
  }

  const onOpenWorkflow = async (functionHit) => {
    console.log("onOpenWorkflow called " + functionHit.data.id)
    const response = await axios.get(getApiBase() + "workflow/" + functionHit.data.process_instanceid + "/functions")
    functionHit.workflowFunctions = response.data.result
    for (let func of functionHit.workflowFunctions) {
      let timeStamp = new Date(Number(func.time_stamp))
      func.time_stamp = timeStamp.toLocaleString()
    }
    functionHit.workflowFunctionsVisible = true

    this.setState(this.state)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <div>
            <div className="rounded-button" title="Refresh">
              <span className="material-symbols-outlined">refresh</span>
            </div>
          </div>

          {functions?.map((func) => (
            <FunctionView func={func} expand={expand} />
          ))}
        </div>
      ),
    },
    {
      path: "/functions/:funcId",
      element: <FuncEditView />,
      loader: functionLoader,
    },
  ])

  return (
    <AppContext.Provider
      value={{
        functions,
        onSearch,
      }}>
      <Container>
        <div>
          <Header />
        </div>

        <ToastContainer />

        <div className="body">
          <div className="left-column">
            <div className="left-menu-item-active">
              <button className="left-menu-icon">
                <span className="material-symbols-outlined">function</span>
                <div>Functions</div>
              </button>
            </div>
            <div className="left-menu-item-inactive">
              <button className="left-menu-icon">
                <span className="material-symbols-outlined">monitoring</span>
                <div>Statistics</div>
              </button>
            </div>
          </div>
          <div className="right-column">
            <RouterProvider router={router} />
          </div>
        </div>
      </Container>
    </AppContext.Provider>
  )
}
