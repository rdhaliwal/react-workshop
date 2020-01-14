import React, { useState, useReducer } from 'react'
import {
  FaSignInAlt,
  FaExclamationCircle,
} from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function useMyState() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ATTEMPTED_SIGNUP':
          return { ...state, loading: true }
        case 'SIGNUP_FAILED':
          return {
            ...state,
            loading: false,
            error: action.error,
          }
        case 'USERNAME_INPUTTED': {
          return { ...state, username: action.user }
        }
        case 'PASSWORD_INPUTTED': {
          return { ...state, password: action.pass }
        }
        case 'TOGGLE_SHOW_PASSWORD': {
          return {
            ...state,
            showPassword: !state.showPassword,
          }
        }
        default: {
          throw new Error(`Unknown action ${action.type}`)
        }
      }
    },
    {
      username: '',
      password: '',
      error: null,
      loading: false,
      showPassword: false,
    }
  )

  return [state, dispatch]
}

function LoginForm({ onAuthenticated }) {
  const [state, dispatch] = useMyState()
  let {
    username,
    password,
    error,
    loading,
    showPassword,
  } = state

  console.log(state)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [showPassword, setShowPassword] = useState(false)

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
        dispatch({ type: 'SIGNUP_FAILED', error })
        // setError(error)
        // setLoading(false)
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
              // setUsername(e.target.value)
              dispatch({
                type: 'USERNAME_INPUTTED',
                user: e.target.value,
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
              dispatch({
                type: 'PASSWORD_INPUTTED',
                pass: e.target.value,
              })
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() =>
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
