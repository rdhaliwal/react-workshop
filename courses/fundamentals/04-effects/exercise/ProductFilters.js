import React, { useState, useEffect } from 'react'
import ProductFilterList from 'YesterTech/ProductFilterList'
import { getCategories } from './utils'

const useCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getCategories().then(categories => {
      if (cancelled) { return null; }
      setCategories(categories);
    });

    return () => {
      cancelled = true;
    }
  }, [ ]);

  return categories;
};

const ProductFilters = () => {
  const categories = useCategories();

  if (!categories) return <div>Loading Filters...</div>

  return (
    <div className="spacing">
      <ProductFilterList list={categories} urlKey="categories" label="Categories" />
    </div>
  )
};

export default ProductFilters
