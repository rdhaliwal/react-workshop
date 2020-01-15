import React, { useState, Fragment } from 'react'
import Quantity from './Quantity'
import ProductImage from 'YesterTech/ProductImage'
import { MdShoppingCart } from 'react-icons/md'
import { useShoppingCartState } from './ShoppingCartState'

function BrowseProductItem({
  productId,
  name,
  price,
  imagePath,
}) {
  let {
    addToCart,
    getQuantity,
    updateQuantity,
  } = useShoppingCartState()
  const quantity = getQuantity(productId)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={
            'button ' + (quantity > 0 ? 'cta-button' : '')
          }
          onClick={() => addToCart(productId, name, price)}
        >
          {quantity === 0 ? (
            'Add To Cart'
          ) : (
            <>
              <MdShoppingCart /> Checkout
            </>
          )}
        </button>
        <div className="align-right">
          {quantity > 0 && (
            <Quantity
              quantity={quantity}
              onChange={quantity => {
                updateQuantity(productId, quantity)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
