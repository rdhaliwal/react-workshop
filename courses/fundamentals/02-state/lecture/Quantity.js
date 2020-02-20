import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  // imperative thinking! booooo :/
  // function handleMinus() {
  //   let inputContainer = document.querySelector('.input-container')
  //   let quantity = parseInt(inputContainer.textContent, 10)
  //   inputContainer.textContent = quantity - 1
  // }

  // function handlePlus() {
  //   let inputContainer = document.querySelector('.input-container')
  //   let quantity = parseInt(inputContainer.textContent, 10)
  //   inputContainer.textContent = quantity + 1
  // }

  function handleMinus() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError(`You cannot have a quantity less than 0!`)
    }
  }

  function handlePlus() {
    setQuantity(quantity + 1)
    setError(null)
  }

  return (
    <div>
      {error && (
        <div>
          <span style={{ fontSize: 12, color: 'red' }}>{error}</span>
        </div>
      )}
      <div className="quantity-picker">
        <div>
          <div>
            <button
              type="button"
              className="icon-button"
              onClick={handleMinus}
            >
              <FaMinusCircle />
            </button>
          </div>
          <div className="input-container">{quantity}</div>
          <div>
            <button
              type="button"
              className="icon-button"
              onClick={handlePlus}
            >
              <FaPlusCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
