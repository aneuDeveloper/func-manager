import styled from "styled-components"
import { useRef, useContext } from "react"
import AppContext from "../AppContext"
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  padding: 8px 0 10px;
  display: flex;

  .left-column {
    width: var(--leftColumnWidth);

    .logo {
      text-align: center;
      width: auto;
      vertical-align: middle;
      margin-top: 8px;
      img {
        width: 110px;
        height: 32px;
      }
    }
  }

  .right-column {
    flex: 1;
    display: flex;
    align-items: center;

    .search-input {
      position: relative;
      height: 50px;
      width: 600px;
      color: blue;
      display: inline-flex;
      background-color: #ffffff;
      border: 1px solid transparent;
      border-radius: 10px;

      img {
        position: absolute;
        left: 20px;
        bottom: 0;
        top: 0;
        margin: auto 0;
      }

      input {
        background-color: #ffffff;
        height: 100%;
        width: 100%;
        border-radius: 10px;
        border: 1px solid transparent;
        outline: none;
        font-size: 16px;
        color: #000000;
      }
    }

    .other-options {
      padding-right: 20px;
      margin-left: auto;
      display: flex;
      align-items: center;
      line-height: 0;
      .option-btn {
        background-color: transparent;
        padding: 0;
        border: none;
        margin-right: 10px;
        outline: 0;
        border-radius: 50%;
        object-fit: cover;
        img {
          width: 30px;
          height: 30px;
        }
      }

      .material-symbols-rounded {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
      }
    }

    .search-field-button {
      background-color: transparent;
      border: none;
      border-radius: 50%;
      width: 50px;
      margin: 3px;
      outline: none;
      &:hover {
        background-color: #e6e8e9;
      }
    }
  }
`

export default function Header() {
  const textInput = useRef(null)
  const { onSearch } = useContext(AppContext)
  // const navigate = useNavigate();

  const searchIfEnterPressed = (event) => {
    if (event.keyCode === 13) {
      exeSearch()
    }
  }

  const exeSearch = () => {
    // navigate("/", { replace: true });
    const freetextValue = textInput.current.value
    onSearch(freetextValue)
  }

  return (
    <StyledHeader>
      <div className="left-column">
        <div className="logo">
          <img src="/assets/logo.png" alt="Functions Logo" />
        </div>
      </div>

      <div className="right-column">
        <div className="search-input">
          <button className="search-field-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
            </svg>
          </button>

          <input placeholder="What are you searing for?" ref={textInput} onKeyDown={searchIfEnterPressed} />

          <button className="search-field-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
            </svg>
          </button>
        </div>

        <div className="other-options">
          {[
            { img: "/assets/question.svg", alt: "Help icon" },
            { img: "/assets/settings.svg", alt: "Settings icon" },
          ].map((option) => (
            <button className="option-btn" key={option.alt}>
              <img src={option.img} alt={option.alt} />
            </button>
          ))}
          <button className="option-btn">
            <img src="/assets/hamburger.svg" alt="Profile icon" />
          </button>
        </div>
      </div>
    </StyledHeader>
  )
}
