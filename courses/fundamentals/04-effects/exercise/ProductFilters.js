import React, { useState, useEffect } from 'react'

import { getCategories } from './utils'
import ProductFilterList from 'YesterTech/ProductFilterList'

function ProductFilters() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    let isCurrent = true
    getCategories().then(cat => {
      if (isCurrent) setCategories(cat)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList
        list={categories}
        urlKey="categories"
        label="Categories"
      />
    </div>
  )
}

export default ProductFilters
