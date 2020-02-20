import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import Heading from 'YesterTech/Heading'
import StarRatings from './StarRatings'
import 'YesterTech/StarRatings.scss'
import 'YesterTech/styles/center-lesson.scss'

const products = [
  { id: 1, name: 'Mario Kart', rating: 5, brand: 'Nintendo', condition: 'new' },
  { id: 2, name: 'Donkey Kong', rating: 3.5, brand: 'Nintendo', condition: 'good' },
  { id: 3, name: 'Nintendo NES', rating: 4, brand: 'Nintendo', condition: 'fair' },
]

function StarRating({ rating }) {
  const stars = []

  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar />)
  }

  if (Math.floor(rating) < rating) {
    stars.push(<FaStarHalfAlt />)
  }

  for (let i = Math.ceil(rating); i < 5; i++) {
    stars.push(<FaRegStar />)
  }

  return <div className="star-rating">{stars}</div>
}

function BrowseProducts() {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            {product.name}
            <StarRating rating={product.rating} />
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<BrowseProducts />, document.getElementById('root'))
