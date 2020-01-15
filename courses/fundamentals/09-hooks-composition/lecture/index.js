import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
} from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'YesterTech/StarRatings'
import Heading from 'YesterTech/Heading'
import api from 'YesterTech/api'

function usePromise(api) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, loading: true }
        case 'RESOLVED':
          return {
            ...state,
            loading: false,
            response: action.res,
            error: null,
          }
        case 'ERROR':
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error,
          }
        default:
          return state
      }
    },
    {
      loading: false,
      response: null,
      error: null,
    }
  )

  let { response, loading, error } = state

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    api()
      .then(res => {
        if (isCurrent) dispatch({ type: 'RESOLVED', res })
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error })
      })
    return () => (isCurrent = false)
  }, [api])

  return [response, loading, error]
}

function ProductProfile({ productId }) {
  const [response, loading, error] = usePromise(
    useCallback(() => api.products.getProduct(productId), [
      productId,
    ])
  )
  let product = response
  // let product = { name: 'fish', rating: 1 }

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
    </div>
  )
}

ReactDOM.render(
  <ProductProfile productId={1} />,
  document.getElementById('root')
)
