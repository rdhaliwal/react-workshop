import React from 'react'
import { useProducts } from './utils'
import BrowseProductItem from './BrowseProductItem'
import { useShoppingCartState } from './ShoppingCartContext'

function BrowseProducts() {
  const { cart, getQuantity } = useShoppingCartState()
  const products = useProducts()

  return (
    <div className="spacing">
      <nav>{cart.length > 0 && <span>View Cart ({cart.length})</span>}</nav>
      <hr />
      {Array.isArray(products) &&
        products.map(product => {
          return (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              price={product.price}
              imagePath={product.imagePath}
              quantity={getQuantity(product.id)}
            />
          )
        })}
    </div>
  )
}

export default BrowseProducts
