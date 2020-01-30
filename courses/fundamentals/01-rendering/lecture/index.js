import React, { useState, useEffect } from 'react'
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

function Pokemon() {
  const [pokemon, setPokemon] = useState('pikachu')
  const [img, setImg] = useState('pikachu')
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'saying hello to ' + pokemon
  }, [pokemon])

  useEffect(() => {
    let isCurrent = true
    fetch(`http://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(res => {
        if (isCurrent) {
          setImg(res.sprites.front_default)
        }
      })
      .catch(error => {
        if (isCurrent) setError(error)
      })
    return () => {
      isCurrent = false
    }
  }, [pokemon])

  return (
    <div>
      <input
        defaultValue={pokemon}
        onChange={e => {
          setPokemon(e.target.value)
        }}
        type="text"
      />
      Hello, {pokemon}!
      <img src={img} />
    </div>
  )
}

ReactDOM.render(
  <div>
    <Pokemon />
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
