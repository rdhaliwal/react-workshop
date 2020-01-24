import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
// import StarRatings from 'YesterTech/StarRatings'
import 'YesterTech/StarRatings.scss'

const products = [
  { id: 1, name: 'Mario Kart', rating: 5, brand: 'Nintendo', condition: 'new' },
  { id: 2, name: 'Donkey Kong', rating: 3.5, brand: 'Nintendo', condition: 'good' },
  { id: 3, name: 'Nintendo NES', rating: 4, brand: 'Nintendo', condition: 'fair' },
]

function StarRatings({ rating }) {
  const stars = []

  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar key={i} />)
  }

  if (rating % 1 > 0) stars.push(<FaStarHalfAlt key="half-star" />)

  while (stars.length < 5) {
    stars.push(<FaRegStar key={stars.length} />)
  }

  return <span className="star-ratings">{stars}</span>
}

function ProductProfile() {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            <Heading>{product.name}</Heading>
            <StarRatings rating={product.rating} />
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<ProductProfile />, document.getElementById('root'))
