import React, { useState, useReducer } from 'react'
import {
  FaSignInAlt,
  FaExclamationCircle,
} from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

let array = [1, 2, 3, 4, 5]
let add = (x, y) => {
  return x + y
}
let sum = array.reduce(add, 0)
console.log(sum)

// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5

let initialState = { count: 0, user: {}, cake: true }
let actions = [
  { type: 'ADD', by: 2 },
  { type: 'MINUS', by: 4 },
  { type: 'EAT_CAKE' },
  { type: 'SET_USER', user: { name: 'john' } },
]

function reducer(state, action) {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + action.by }
  } else if (action.type === 'MINUS') {
    return { ...state, count: state.count - action.by }
  } else if (action.type === 'EAT_CAKE') {
    return { ...state, cake: false }
  } else if (action.type === 'SET_USER') {
    return { ...state, user: action.user }
  }
}

console.log(actions.reduce(reducer, initialState))

function LoginForm({ onAuthenticated }) {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [showPassword, setShowPassword] = useState(false)

  let reducer = (state, action) => {
    switch (action.type) {
      case 'ATTEMPTED_SIGNUP': {
        return { ...state, loading: true }
      }
      case 'SIGNUP_ERROR': {
        return {
          ...state,
          loading: false,
          error: action.error,
        }
      }
      case 'SET_USERNAME': {
        return { ...state, username: action.username }
      }
      case 'SET_PASSWORD': {
        return { ...state, password: action.password }
      }
      case 'TOGGLE_SHOW_PASSWORD': {
        return {
          ...state,
          showPassword: !state.showPassword,
        }
      }
      default: {
        return state
      }
    }
  }

  let initialState = {
    username: '',
    password: '',
    error: null,
    loading: false,
    showPassword: false,
  }

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  let {
    username,
    password,
    error,
    loading,
    showPassword,
  } = state

  console.log(showPassword)

  function handleLogin(event) {
    event.preventDefault()
    // setLoading(true)
    dispatch({ type: 'ATTEMPTED_SIGNUP' })
    api.auth
      .login(username, password)
      .then(user => {
        if (typeof onAuthenticated === 'function') {
          onAuthenticated(user)
        }
      })
      .catch(error => {
        // setError(error)
        // setLoading(false)
        dispatch({ type: 'SIGNUP_ERROR', error })
      })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            aria-label="Username"
            onChange={e => {
              // return setUsername(e.target.value)
              dispatch({
                type: 'SET_USERNAME',
                username: e.target.value,
              })
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => {
              // return setPassword(e.target.value)
              dispatch({
                type: 'SET_PASSWORD',
                password: e.target.value,
              })
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() =>
                // setShowPassword(!showPassword)
                dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
              }
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
