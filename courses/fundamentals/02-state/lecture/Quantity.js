import React from 'react'
import ReactDOM from 'react-dom'
import {
  FaMinusCircle,
  FaPlusCircle,
} from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

// npm start lecture
// fundamentals
// 2 - state
// 02-state
// lecture
// Quantity.js

// I AM REACT

// let el = Quantity() // state quantity = 1
// const domTable = {}
// domTable.commit(el)
// let oldEl = el
// el = Quantity() // state quantity = 2
// let diff = diff(oldEl, el)
// commit(diff)

let callCount = -1
let states = []

function useState(initialValue) {
  const id = ++callCount
  if (states[id]) return states[id]

  let setValue = newValue => {
    states[id][0] = newValue
    renderPhonyHooks()
  }

  let tuplé = [initialValue, setValue]
  states.push(tuplé)
  return tuplé
}

export default function Quantity() {
  const [quantity, setQuantity] = useState(1)
  // quantity[0] // quantity variable
  // quantity[1] // set quantity function

  const [error, setError] = useState(null)

  console.log(states)

  // Don't do this
  // {} === {}
  // const [wholeState, setWholeState] = useState({
  //   quantity: 0,
  //   error: null,
  // })

  const subtract = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError('Greater than 0 pleeeease')
    }
  }

  const add = () => {
    setQuantity(quantity + 1)
    setError(null)
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
          {quantity}
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
      {error && (
        <marquee>
          <div style={{ color: 'red' }}>
            {error}
          </div>
          <button
            onClick={() => {
              setError(null)
            }}
          >
            Dismiss
          </button>
        </marquee>
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
