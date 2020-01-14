import React, { useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom'
import 'YesterTech/PrimaryLayout.scss'
import './styles.scss'

// Route Targets
import BrowseProducts from './BrowseProducts'
import Checkout from 'YesterTech/Checkout'

function PrimaryLayout() {
  const [cart, setCart] = useState([])

  function getCartSize() {
    return cart.reduce(
      (size, item) => size + item.quantity,
      0
    )
  }

  function addToCart(productId, name, price) {
    const newCart = cart.concat([
      { productId, quantity: 1, name, price },
    ])
    setCart(newCart)
  }

  function updateQuantity(productId, quantity) {
    let newCart
    if (quantity > 0) {
      newCart = cart.map(product => {
        return product.productId === productId
          ? { ...product, quantity }
          : product
      })
    } else {
      newCart = cart.filter(
        product => product.productId !== productId
      )
    }
    setCart(newCart)
  }

  function getQuantity(productId) {
    if (!Array.isArray(cart)) return 0
    return (
      (cart.find(p => p.productId === productId) || {})
        .quantity || 0
    )
  }

  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header">
          <NavLink to="/products">Products</NavLink>
          {cart.length > 0 && (
            <NavLink to="/checkout">Checkout</NavLink>
          )}
        </header>
        <main className="primary-content">
          <Switch>
            <Route path="/products">
              <BrowseProducts
                getCartSize={getCartSize}
                addToCart={addToCart}
                getQuantity={getQuantity}
                updateQuantity={updateQuantity}
              />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout cart={cart} />
              </Route>
            )}
            <Redirect to="/products" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default PrimaryLayout
