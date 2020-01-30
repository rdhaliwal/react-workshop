import React, { useReducer } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// To run the final solution: Comment this in and the rest out
// import Checkout from './Checkout.final'
// export default Checkout

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from './CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

function Checkout() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SUBMIT_BILLING': {
          return {
            ...state,
            sameAsBilling: action.sameAsBilling,
            fields: action.fields,
          }
        }
      }
    },
    {
      sameAsBilling: false,
      fields: {},
    }
  )

  const match = useRouteMatch()
  const history = useHistory()

  function handleBillingSubmit(sameAsBilling, fields) {
    console.log(sameAsBilling, fields)
    dispatch({
      type: 'SUBMIT_BILLING',
      sameAsBilling,
      fields,
    })
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling
            onSubmit={handleBillingSubmit}
            defaultValues={state.fields}
          />
        </Route>

        {Object.keys(state.fields).length > 0 && (
          <Route path={`${match.path}/review`}>
            <CheckoutReview
              sameAsBilling={state.sameAsBilling}
              fields={state.fields}
            />
          </Route>
        )}

        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout
