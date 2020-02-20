import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  //     something[0]  something[1]
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  const handleDecrease = () => {
    if (quantity <= 0) {
      setError('Must be > 0')
    } else {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (error) {
      setError(null)
    }
    setQuantity(quantity + 1)
  }

  return (
    <div className="quantity-picker">
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <div>
        <div>
          <button type="button" className="icon-button" onClick={handleDecrease}>
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button type="button" className="icon-button" onClick={handleIncrease}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}
