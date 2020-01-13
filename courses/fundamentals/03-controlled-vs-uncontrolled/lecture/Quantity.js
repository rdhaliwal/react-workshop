import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [someState, setSomeState] = useState(10)

  const add = () => {
    setQuantity(quantity + 1)
  }

  const subtract = () => {
    setQuantity(quantity - 1)
  }

  // Before:
  // event => update Dom
  // event => update Dom
  // event => update Dom
  // event => update Dom
  // event => update Dom

  // React:
  // event+event+event => state => Update DOM

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
            type="number"
            aria-label="quantity"
            value={quantity}
            onChange={event => {
              setQuantity(parseInt(event.target.value, 10))
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
        style={{ color: `hsl(${someState}, 100%, 50%)` }}
      >
        Hi there
      </div>
    </div>
  )
}

export default Quantity
