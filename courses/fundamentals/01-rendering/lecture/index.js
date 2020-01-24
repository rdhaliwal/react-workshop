import React from 'react'
import ReactDOM from 'react-dom'
// import { FaRegStar, FaStar } from 'react-icons/fa'
import './styles.scss'

function Button({ children }) {
  return (
    <button type="button" className="normal-button">
      {children}
    </button>
  )
}

function Icon() {
  return <svg></svg>
}

function App() {
  return (
    <div>
      <Button>
        HelloSF
        <Icon />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
