import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  // const [user, setUser] = useState(null)

  // state: current state
  // dispatch: sends an action to React for the reducer
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'AUTHENTICATED': {
          return { ...state, user: action.user }
        }
        default: {
          return state
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
