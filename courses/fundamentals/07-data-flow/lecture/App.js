import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import PrimaryLayout from './PrimaryLayout'
import ShoppingCartState from './ShoppingCartContext'
import 'YesterTech/styles/global-styles.scss'

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartState>
        <PrimaryLayout />
      </ShoppingCartState>
    </BrowserRouter>
  )
}

export default App
