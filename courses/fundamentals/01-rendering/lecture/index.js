import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import './styles.scss'

// let's go

const someElement = React.createElement(
  'button',
  {
    style: { fontWeight: 'bold' },
  },
  'Hello world'
)

console.log(someElement)

ReactDOM.render(someElement, document.querySelector('#root'))
