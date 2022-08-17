import React from "react"
import { Icon } from "semantic-ui-react"

export default function Category({ icon, text, isSelected, handleClick }) {
  return (
    <div
      className={`category ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
    <span>{text}</span>
      <Icon
        name={icon}
        style={{
          fontSize: "2rem",
          color: `${isSelected ? "white" : ""}`
        }}
      />
    </div>
  )
}