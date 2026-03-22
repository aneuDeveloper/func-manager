import { useEffect, useState } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { doLogout, setShowLoginPage } from "./Api";
import AppContext from "./AppContext";
import FuncEditView, { functionLoader } from "./components/FuncEditView";
import Header from "./components/Header";
import HitList, { hitListLoader } from "./components/HitList";
import LeftMenu from "./components/LeftMenu";
import Login from "./components/Login";
import { ProtectedRoute } from "./ProtectedRoute";

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
        background-color: #FFFFFF;
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

  .middle-this {
    margin: auto;
    width: 50%;
    text-align: center;
  }
`

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setShowLoginPage(() => {
      setIsAuthenticated(false);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Link to="/filter">Filter</Link>,
        },
        {
          path: "/filter",
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
      ],
    },
  ]);

  const logout = () => doLogout();

  return (
    <AppContext.Provider value={{ isAuthenticated, logout }}>
      <ToastContainer />
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}
