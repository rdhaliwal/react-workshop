import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import './styles.scss'

const text = 'Add'

// const reactElement = React.createElement(
//   'div',
//   null,
//   (() => {
//     return text + '!!!!!'
//   })(),
//   React.createElement('span', null, 'hola')
// )

// Just JavaScript™

const Button = props => {
  let { children, onClick } = props
  return (
    <button
      className="render_button"
      onKeyDown={event => {
        if (event.key === 'Enter') {
          props.someCustomEvent()
        }
      }}
    >
      {children}
    </button>
  )
}

const domElement = document.getElementById('root')

ReactDOM.render(
  <div>
    <Button
      someCustomEvent={() => {
        console.log('minus clicked!')
      }}
    >
      <FaRegStar /> Subtract <FaRegStar />
    </Button>
    <Button>
      <FaStar /> Add
    </Button>
  </div>,
  domElement
)

// <Button>{element} {element2} {stuff.map(() => {
//   return element3and4
// })}</Button>
// React.createElement(Button, {}, element)
// React.createElement(Button, { children: element})

// React.createElement(Button, {}, element, element2, [element3and4])
// React.createElement(Button, { children: [element], [element2], [3and4]})
