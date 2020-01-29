import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import './styles.scss'

// let's go

// npm start lecture
// fundamentals
// 1

// Just JavaScript™

// const reactEl = React.createElement(
//   'button',
//   null,
//   '+',
//   text
// )

function Button(props) {
  let { children, onPrint } = props

  return (
    <button
      className="render_button"
      onKeyDown={event => {
        if ((event.key = ' ')) {
          onPrint('hi there')
        }
      }}
    >
      {children}
    </button>
  )
}

const domElement = document.getElementById('root')

function printStuff(stuff) {
  console.log('stuff: ' + stuff)
}

ReactDOM.render(
  <div>
    {/* Option 1 */}
    <Button onPrint={printStuff}>
      <FaStar /> Add
    </Button>

    {/* Option 2 */}
    <Button children={<FaRegStar />} />

    {/* Option 1 again */}
    {/* By position */}
    <Button>
      Subtract <FaRegStar />
    </Button>
  </div>,
  domElement
)

{
  /* <Button>
{element}
{element2}
</Button> */
}

// React.createElement(Button, {}, element, element2)

// React.createElement(Button, {
//   children: [element, element2],
// })
