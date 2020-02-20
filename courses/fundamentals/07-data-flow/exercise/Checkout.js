import React, { useState, useReducer, useContext, createContext } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from './CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

export const BillingContext = createContext();

const initialState = {
  sameAsBilling: false,
  fields: [],
};

const updateState = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SAME_AS_BILLING':
      return { ...state, sameAsBilling: action.sameAsBilling }
    case 'UPDATE_FIELDS':
      return { ...state, fields: action.fields }
    case 'UPDATE_BOTH':
      return { ...state, fields: action.fields, sameAsBilling: action.sameAsBilling }
    default:
      return state
  }
};

const Checkout = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const [state, dispatch] = useReducer(updateState, initialState);
  const { fields, sameAsBilling } = state;

  console.log('fields', JSON.stringify(fields, null, 2));
  console.log('sameAsBilling', JSON.stringify(sameAsBilling, null, 2));

  const handleBillingSubmit = (sameAsBilling, fields) => {
    console.log(sameAsBilling, fields);
    dispatch({ type: 'UPDATE_SAME_AS_BILLING', sameAsBilling });
    dispatch({ type: 'UPDATE_FIELDS', fields });
    history.push(`${match.path}/review`);
  };

  return (
    <BillingContext.Provider value={{ fields, sameAsBilling }}>
      <Centered>
        <Switch>
          <Route path={`${match.path}/cart`} exact>
            <ViewCart />
          </Route>
          <Route path={`${match.path}/billing`}>
            <CheckoutBilling onSubmit={handleBillingSubmit} />
          </Route>

          {
            Object.keys(fields).length > 0 && (
              <Route path={`${match.path}/review`}>
                <CheckoutReview
                  fields={fields}
                  sameAsBilling={sameAsBilling}
                />
              </Route>
            )
          }

          <Redirect to={`${match.path}/cart`} />
        </Switch>
      </Centered>
    </BillingContext.Provider>
  )
}

export default Checkout
