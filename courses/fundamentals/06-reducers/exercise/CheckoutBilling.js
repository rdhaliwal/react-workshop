import React, { useState, useReducer } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  // const [sameAsBilling, setSameAsBilling] = useState(false)
  // const [billingName, setBillingName] = useState('')
  // const [billingAddress, setBillingAddress] = useState('')
  // const [shippingName, setShippingName] = useState('')
  // const [shippingAddress, setShippingAddress] = useState('')

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE_SAME_AS_BILLING':
          return {
            ...state,
            sameAsBilling: !state.sameAsBilling,
          }
        case 'SET_BILLING_NAME': {
          return {
            ...state,
            billingName: action.billingName,
          }
        }
        case 'SET_BILLING_ADDRESS': {
          return {
            ...state,
            billingAddress: action.billingAddress,
          }
        }
        case 'SET_SHIPPING_NAME': {
          return {
            ...state,
            shippingName: action.shippingName,
          }
        }
        case 'SET_SHIPPING_ADDRESS': {
          return {
            ...state,
            shippingAddress: action.shippingAddress,
          }
        }
        default:
          return state
      }
    },
    {
      sameAsBilling: false,
      billingName: '',
      billingAddress: '',
      shippingName: '',
      shippingAddress: '',
    }
  )

  let {
    sameAsBilling,
    billingName,
    billingAddress,
    shippingName,
    shippingAddress,
  } = state

  function handleSubmit(event) {
    event.preventDefault()
    const fields = {
      billingName,
      billingAddress,
      shippingName,
      shippingAddress,
    }
    onSubmit(fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing & Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            defaultValue={billingName}
            onChange={event =>
              dispatch({
                type: 'SET_BILLING_NAME',
                billingName: event.target.value,
              })
            }
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            defaultValue={billingAddress}
            onChange={event =>
              dispatch({
                type: 'SET_BILLING_ADDRESS',
                billingAddress: event.target.value,
              })
            }
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() =>
              // setSameAsBilling(!sameAsBilling)
              dispatch({ type: 'TOGGLE_SAME_AS_BILLING' })
            }
          />{' '}
          Same as Billing
        </label>

        <hr />

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            required
            id="shipping:name"
            type="text"
            value={
              sameAsBilling ? billingName : shippingName
            }
            onChange={event =>
              dispatch({
                type: 'SET_SHIPPING_NAME',
                shippingName: event.target.value,
              })
            }
            disabled={sameAsBilling}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            required
            id="shipping:address"
            type="text"
            value={
              sameAsBilling
                ? billingAddress
                : shippingAddress
            }
            onChange={event =>
              dispatch({
                type: 'SET_SHIPPING_ADDRESS',
                shippingAddress: event.target.value,
              })
            }
            disabled={sameAsBilling}
          />
        </div>

        <hr />

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling
