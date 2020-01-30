import React, { useState } from 'react'
import { useShoppingCartState } from './ShoppingCartState'

import { useProducts } from './utils'
import BrowseProductItem from './BrowseProductItem'

function BrowseProducts() {
  let { getCartSize } = useShoppingCartState()
  const products = useProducts()

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
