import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styled from "styled-components"
import Header from "./components/Header"
import { getFromStorage, saveToStorage } from "./utils/storage"
import AppContext from "./AppContext"
import LeftMenu from "./components/LeftMenu"
import SearchView, { searchLoader } from "./components/SearchView"

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


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Container>
          <div>
            <Header />
          </div>
          <div className="body">
            <LeftMenu />
            <div className="right-column">
              <div>
                <div>
                  <div className="rounded-button" title="Refresh">
                    <span className="material-symbols-outlined">refresh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      ),
    },
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
              <SearchView />
            </div>
          </div>
        </Container>
      ),
      loader: searchLoader,
    },
  ])

  return (
    <AppContext.Provider
      value={{      }}>
      <ToastContainer />
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}
