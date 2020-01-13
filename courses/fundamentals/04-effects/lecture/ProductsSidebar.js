import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

// class ProductsSidebar2 extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       matches: window.matchMedia('(min-width: 800px)')
//         .matches,
//     }
//   }

//   setup() {
//     const media = window.matchMedia('(min-width: 800px)')
//     this.listener = () => {
//       this.setState({ matches: this.media.matches })
//     }
//     this.media.addListener(this.listener)
//   }

//   cleanup() {
//     this.media.removeListener(this.listener)
//   }

//   componentDidMount() {
//     this.setup()
//   }

//   componentWillUnmount() {
//     this.cleanup()
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps !== this.props) {
//       this.cleanup()
//       this.setup()
//     }
//   }

//   render() {
//     return (
//       this.state.matches && (
//         <aside>
//           <ProductFilters />
//         </aside>
//       )
//     )
//   }
// }

function useMedia(query) {
  const [matches, setMatches] = useState(
    window.matchMedia(query).matches
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches])

  return matches
}

function ProductsSidebar() {
  let isWide = useMedia('(min-width: 800px)')

  // useEffect(() => {
  //   document.title = 'is this wide?' + isWide
  // }, [isWide])

  return (
    isWide && (
      <aside>
        <ProductFilters />
      </aside>
    )
  )
}

// [] = on mount
// [something] = on mount, whenever something changes
// no array = whenever any state changes

export default ProductsSidebar
