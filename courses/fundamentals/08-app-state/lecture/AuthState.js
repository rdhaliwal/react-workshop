import React, { useContext, useReducer } from 'react'

const AuthStateContext = React.createContext()

const initialState = {
  authenticated: false,
  user: null,
}


export function AuthStateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, authenticated: true, user: action.user }
      }
      case 'LOGOUT': {
        return { ...initialState }
      }
      default:
        return state
    }
  }, initialState)

  const value = {
    ...state,
    dispatch,
  }

  // This is a really nice patter for hooks and contexts
  return <AuthStateContext.Provider value={value} children={children} />
}

// This is a really nice patter for hooks and contexts
export function useAuthState() {
  return useContext(AuthStateContext)
}
