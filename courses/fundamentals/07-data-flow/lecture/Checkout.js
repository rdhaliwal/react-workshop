import React from 'react'
import Heading from 'YesterTech/Heading'

function Checkout({ cart = [] }) {
  return (
    <div>
      <Heading>Cart Review</Heading>
      {Array.isArray(cart) && cart.length > 0 ? (
        <ul>
          {cart.map(item => (
            <li>{item.name}</li>
          ))}
        </ul>
      ) : (
        <div>Cart is empty.</div>
      )}
    </div>
  )
}

export default Checkout
