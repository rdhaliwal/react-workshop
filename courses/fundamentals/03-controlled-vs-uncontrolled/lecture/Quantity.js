import React, { useState, useRef } from 'react'
import {
  FaMinusCircle,
  FaPlusCircle,
} from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

// npm start lecture
// fundamentals
// 3
// 03-controlled-vs-uncontrolled
// lecture
// Quantity.js

// Event => updates DOM

// Event + event + event => state => updates DOM

function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [someState, setSomeState] = useState(10)

  let inputRef = useRef()

  const add = () => {
    setQuantity(quantity + 1)
  }

  const subtract = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={subtract}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={event => {
              setQuantity(
                parseInt(event.target.value)
              )
              setSomeState(quantity * 10)
            }}
          />
        </div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={add}
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
      <div
        style={{
          color: `hsl(${someState}, 100%, 50%)`,
        }}
      >
        hi there
      </div>
    </div>
  )
}

export default Quantity
