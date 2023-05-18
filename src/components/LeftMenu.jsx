import styled from "styled-components"

const LeftColumn = styled.div`
  width: 200px;
  
  .left-menu-item-active {
    position: relative;
    padding-right: 10px;
    margin-right: 10px;
    background-color: #8795ad;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    font-weight: bold;
  }

  .left-menu-icon {
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: transparent;
    color: #ffffff;
    border: 0;
    font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-size: 14px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    outline: 0;
    font-weight: inherit;
  }
`

export default function LeftMenu() {
  return (
    <LeftColumn>
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
    </LeftColumn>
  )
}
