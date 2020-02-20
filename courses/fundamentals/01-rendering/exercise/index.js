import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import Heading from 'YesterTech/Heading'
import 'YesterTech/StarRatings.scss'
import 'YesterTech/styles/center-lesson.scss'

const products = [
  { id: 1, name: 'Mario Kart', rating: 5, brand: 'Nintendo', condition: 'new' },
  { id: 2, name: 'Donkey Kong', rating: 3.5, brand: 'Nintendo', condition: 'good' },
  { id: 3, name: 'Nintendo NES', rating: 4, brand: 'Nintendo', condition: 'fair' },
]

function StarRatings({ rating, max = 5 }) {
  let stars = []

  for (let i = 0; i < max; ++i) {
    if (i + 1 <= rating) {
      stars.push(<FaStar key={i} />)
    } else if (i < rating) {
      stars.push(<FaStarHalfAlt key={i} />)
    } else {
      stars.push(<FaRegStar key={i} />)
    }
  }

  return <span className="star-ratings">{stars}</span>
}

function BrowseProducts() {
  let items = products.map(product => (
    <div key={product.id}>
      <Heading>{product.name}</Heading>
      <StarRatings rating={product.rating} />
      <div className="text-small">
        <div>Brand: {product.brand}</div>
        <div>Condition: {product.condition}</div>
      </div>
    </div>
  ))

  return <div>{items}</div>
}

ReactDOM.render(<BrowseProducts />, document.getElementById('root'))
