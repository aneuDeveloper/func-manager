import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import AppContext from "./AppContext";
import FuncEditView, { functionLoader } from "./components/FuncEditView";
import Header from "./components/Header";
import HitList, { hitListLoader } from "./components/HitList";
import LeftMenu from "./components/LeftMenu";
import Login from "./components/Login";

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

      .right-column {
        flex: 1;
        width: 100%;
        background-color: #DCE0E6;
        border-radius: 10px;
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
`;

export default function App() {
  const [functions, setFunctions] = useState([]);

  // const onSearch = async (freetext) => {
  //   console.log("Search for text=" + freetext);
  //   // navigate("/search", { replace: true });
  //   try {
  //     const funcList = await search(freetext);
  //     let funcArr = [];
  //     for (let func of funcList) {
  //       let timeStamp = new Date(Number(func.time_stamp));
  //       func.time_stamp = timeStamp.toLocaleString();

  //       const functionHit = new FunctionHit();
  //       functionHit.data = func;
  //       functionHit.detailVisible = false;
  //       funcArr.push(functionHit);
  //     }

  //     setFunctions(funcArr);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const router = createBrowserRouter([
    {
      path: "/search",
      element: (
        <Container>
          <div>
            <Header />
          </div>
          <div className="body">
            <LeftMenu />
            <div className="right-column">
              <HitList />
            </div>
          </div>
        </Container>
      ),
      loader: hitListLoader,
    },
    {
      path: "/functions/:funcId",
      element: (
        <Container>
          <div>
            <Header />
          </div>

          <div className="body">
            <LeftMenu />
            <div className="right-column">
              <FuncEditView />
            </div>
          </div>
        </Container>
      ),
      loader: functionLoader,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        functions,
      }}
    >
      <ToastContainer />
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
