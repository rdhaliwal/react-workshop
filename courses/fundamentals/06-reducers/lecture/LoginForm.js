import React, { useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function LoginForm({ onAuthenticated }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, loading: true }
        case 'LOGIN_ERROR':
          return { ...state, loading: false, error: action.error }
        case 'USERNAME_CHANGE':
          return { ...state, username: action.value }
        case 'PASSWORD_CHANGE':
          return { ...state, password: action.value }
        case 'SHOW_PASSWORD_CHANGE':
          return { ...state, showPassword: !state.showPassword }
        default:
          return state
      }
    },
    {
      error: null,
      loading: false,
      username: '',
      password: '',
      showPassword: false,
    }
  )

  const { error, loading, username, password, showPassword } = state

  function handleLogin(event) {
    event.preventDefault()
    dispatch({ type: 'LOGIN' })
    api.auth
      .login(username, password)
      .then(user => {
        if (typeof onAuthenticated === 'function') {
          onAuthenticated(user)
        }
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_ERROR', error })
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
            onChange={e => dispatch({ type: 'USERNAME_CHANGE', value: e.target.value })}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => dispatch({ type: 'PASSWORD_CHANGE', value: e.target.value })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => dispatch({ type: 'SHOW_PASSWORD_CHANGE' })}
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
