import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

function ProductsSidebar() {
  const query = '(min-width: 800px)'
  const [isWide, setIsWide] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    function listener() {
      setIsWide(media.matches)
    }
    media.addListener(listener)
    return () => {
      media.removeListener(listener)
    }
  }, [])

  if (!isWide) return null

  return (
    <aside>
      <ProductFilters />
    </aside>
  )
}

export default ProductsSidebar
