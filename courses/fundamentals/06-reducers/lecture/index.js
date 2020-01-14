import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

// function useDocumentTitle(pokemon) {
//   useEffect(() => {
//     document.title = 'Gotta catch dat ' + pokemon
//   }, [pokemon])
// }

// function Pokemon() {
//   const [pokemon, setPokemon] = useState({
//     name: 'pikachu',
//   })

//   useDocumentTitle(pokemon)

//   useEffect(() => {
//     let isCurrent = true
//     fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
//     )
//       .then(res => res.json())
//       .then(res => {
//         if (isCurrent) setPokemon(res)
//       })
//     return () => {
//       isCurrent = false
//     }
//   }, [pokemon.name])

//   return (
//     <div>
//       <div>Hello, {pokemon.name}!</div>
//       <img
//         src={pokemon?.sprites?.front_default}
//         alt="sprite"
//       />
//       <input
//         type="text"
//         defaultValue={pokemon.name}
//         onChange={event => {
//           setPokemon(event.target.value)
//         }}
//       />
//     </div>
//   )
// }

// npm start lecture, 6

let array = [1, 2, 3, 4, 5]
let add = (x, y) => {
  return x + y
}
let sum = array.reduce(add, 0)

// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5
// 15

// console.log(sum)

const initialState = { count: 0, user: {}, cake: true }
const actions = [
  { type: 'ADD', by: 2 },
  { type: 'MINUS', by: 4 },
  { type: 'EAT_CAKE' },
]

function reducer(state, action) {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + action.by }
  } else if (action.type === 'MINUS') {
    return { ...state, count: state.count - action.by }
  } else if (action.type === 'EAT_CAKE') {
    return { ...state, cake: false }
  }
}

console.log(actions.reduce(reducer, initialState))

function App() {
  // const [user, setUser] = useState(null)
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'AUTHENTICATED':
          return { ...state, user: action.user }
        default: {
          throw new Error(`Unknown action ${action.type}`)
        }
      }
    },
    {
      user: null,
    }
  )

  let { user } = state

  return (
    <div>
      {user ? (
        <div className="align-center">
          You are logged in
        </div>
      ) : (
        <LoginForm
          onAuthenticated={u => {
            dispatch({ type: 'AUTHENTICATED', user: u })
          }}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
