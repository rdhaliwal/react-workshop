import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar, FaStarHalfAlt, FaStarAndCrescent } from 'react-icons/fa'
import Heading from 'YesterTech/Heading'
import 'YesterTech/StarRatings.scss'
import 'YesterTech/styles/center-lesson.scss'

const products = [
  { id: 1, name: 'Mario Kart', rating: 5, brand: 'Nintendo', condition: 'new' },
  { id: 2, name: 'Donkey Kong', rating: 3.5, brand: 'Nintendo', condition: 'good' },
  { id: 3, name: 'Nintendo NES', rating: 4, brand: 'Nintendo', condition: 'fair' },
]

const StarRating = ({ rating }) => {
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
  return <div>{stars}</div>
}

const BrowseProducts = () => {
  return (
    <div>
      {products.map(product => {
        return (
          // Index is not great, as a key because when you have use cases where things are reordered,
          // It'll kind of mess things up. But it's not the worst thing in the world
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

const someElement = React.createElement(
  'button',
  {
    style: { fontWeight: 'bold' },
  },
  'Hello world'
)

const equivalentElement = <button style={{ fontWeight: 'bold' }}>Hello world</button>
