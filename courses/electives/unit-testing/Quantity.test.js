import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Quantity from './Quantity'

describe('A <Quantity> element', () => {
  let container, consoleSpy
  beforeEach(() => {
    container = document.createElement('div')
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    consoleSpy.mockRestore()
    container = null
  })

  describe('by default', () => {
    it('starts at 0', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })

      let quantity = container.querySelector(
        '[data-testid=quantity]'
      )

      expect(quantity.value).toEqual('0')
    })
  })

  function click(node, extraProps) {
    act(() => {
      node.dispatchEvent(new MouseEvent('click', extraProps))
    })
  }

  describe('clicking the plus button', () => {
    it('logs the quantity to the console', async () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })

      let addButton = container.querySelector(
        '[data-testid=add-button]'
      )

      click(addButton, { bubbles: true })

      expect(consoleSpy).toHaveBeenCalledTimes(2)
      expect(consoleSpy).toHaveBeenNthCalledWith(1, 0)
      expect(consoleSpy).toHaveBeenNthCalledWith(2, 1)
    })
  })

  describe('clicking the minus button', () => {
    it('does not go below 0', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })

      let subtractButton = container.querySelector(
        '[data-testid=subtract-button]'
      )
      let quantity = container.querySelector(
        '[data-testid=quantity]'
      )

      act(() => {
        subtractButton.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        )
      })

      expect(quantity.value).toEqual('0')
    })
  })

  describe('clicking the plus button and then the minus button', () => {
    it('increments and then decrements counter', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })

      let subtractButton = container.querySelector(
        '[data-testid=subtract-button]'
      )
      let addButton = container.querySelector(
        '[data-testid=add-button]'
      )
      let quantity = container.querySelector(
        '[data-testid=quantity]'
      )

      act(() => {
        addButton.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        )
      })

      expect(quantity.value).toEqual('1')

      act(() => {
        subtractButton.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        )
      })

      expect(quantity.value).toEqual('0')
    })
  })

  describe('hitting the arrow down key', () => {
    it('does not go below 0', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })

      let quantity = container.querySelector(
        '[data-testid=quantity]'
      )

      act(() => {
        quantity.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
          })
        )
      })

      expect(quantity.value).toEqual('0')
    })
  })

  describe('hitting the arrow up key followed by the arrow down key', () => {
    it('increments and then decrements the counter', () => {
      act(() => {
        ReactDOM.render(<Quantity />, container)
      })

      let quantity = container.querySelector(
        '[data-testid=quantity]'
      )

      act(() => {
        quantity.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true,
          })
        )
      })

      expect(quantity.value).toEqual('1')

      act(() => {
        quantity.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
          })
        )
      })

      expect(quantity.value).toEqual('0')
    })
  })
})
