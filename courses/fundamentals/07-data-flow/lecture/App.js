import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import PrimaryLayout from './PrimaryLayout'
import 'YesterTech/styles/global-styles.scss'
import { ShoppingCartProvider } from './ShoppingCartState'

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <PrimaryLayout />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
