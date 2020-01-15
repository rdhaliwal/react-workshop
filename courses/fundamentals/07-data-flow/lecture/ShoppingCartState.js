import React, { useState, useContext } from 'react'

const ShoppingContext = React.createContext()

export function ShoppingCartProvider({ children }) {
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

  let value = {
    cart,
    setCart,
    getCartSize,
    getQuantity,
    addToCart,
    updateQuantity,
  }

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  )
}

export function useShoppingCartState() {
  return useContext(ShoppingContext)
}
