import React, { useState } from 'react'
import { useProducts } from './utils'
import BrowseProductItem from './BrowseProductItem'
import { useShoppingCartState } from './ShoppingCartState'

function BrowseProducts() {
  const products = useProducts()
  let { getCartSize } = useShoppingCartState()

  return (
    <div className="spacing">
      <nav>
        <span>View Cart ({getCartSize()})</span>
      </nav>
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
            />
          )
        })}
    </div>
  )
}

export default BrowseProducts
