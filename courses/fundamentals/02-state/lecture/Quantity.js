import React from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

// I AM REACT

// let el = Quantity()
// let domTable = {}

// createDOM(el, domTable) // virtual DOM
// let oldEl = el

// el = Quantity() // new props
// const diff = compare(oldEl, el)

// commit(diff)

let states = []
let callCount = -1

function useState(initialValue) {
  const id = ++callCount
  if (states[id]) return states[id]
  const setValue = newValue => {
    states[id][0] = newValue
    renderPhonyHooks()
  }
  const tuplé = [initialValue, setValue]
  states[callCount] = tuplé
  return tuplé
}

export default function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  console.log(states)

  const add = () => {
    setQuantity(quantity + 1)
    setError(null)
  }

  const subtract = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError('Greater than 0 pleeease')
    }
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
        <div className="input-container">{quantity}</div>
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
      {error && (
        <div style={{ color: 'red ' }}>
          <marquee>
            <div className="text-small">{error}</div>
            <button
              onClick={() => {
                setError(null)
              }}
            >
              Dismiss
            </button>
          </marquee>
        </div>
      )}
    </div>
  )
}

function renderPhonyHooks() {
  callCount = -1
  ReactDOM.render(
    <Quantity />,
    document.getElementById('root')
  )
}

renderPhonyHooks()
