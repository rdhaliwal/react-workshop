import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

// npm start lecture
// fundamentals
// 4
// 04-effects/lecture/ProductsSidebar.js
// localhost:3000/products

let z = 10

function add(x, y) {
  z = z + x
  return x + y
}

function ProductsSidebar() {
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 800px)'
    )
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addListener(listener)
    return () => {
      media.removeListener(listener)
    }
  }, [])

  // useEffect(
  //   () => {
  //     // side effect
  //   },
  //   [
  //     /* variables to sync with */
  //   ]
  // )

  // [populated] = effect runs whenever `populated` changes
  //               and also on mount
  // [] = effect runs on mount
  // no array = effect runs whenever any state changes

  return (
    <>
      {isWide && (
        <aside>
          <ProductFilters />
        </aside>
      )}
    </>
  )
}

export default ProductsSidebar
