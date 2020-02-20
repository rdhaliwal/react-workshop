import React, {
  useState,
  useContext,
  createContext,
  Children,
} from 'react'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Tabs({ data, tabsPosition = 'top' }) {
  const [activeIndex, setActiveIndex] = useState(0)

  let panels = (
    <div data-reach-tab-panels>{data[activeIndex].content}</div>
  )
  let tabs = (
    <div data-reach-tab-list>
      {data.map((tab, index) => {
        const isActive = index === activeIndex
        return (
          <div
            data-reach-tab
            key={index}
            className={
              tab.disabled
                ? 'disabled'
                : isActive
                ? 'active'
                : ''
            }
            onClick={
              tab.disabled
                ? undefined
                : () => setActiveIndex(index)
            }
          >
            {tab.label}
          </div>
        )
      })}
    </div>
  )

  return (
    <div data-reach-tabs>
      {tabsPosition === 'bottom'
        ? [panels, tabs]
        : [tabs, panels]}
    </div>
  )
}

// 2 patterns:
// - React.Children + React.cloneElement
// - Context provider

function useControl(defaultValue, value, onChange) {
  let [localValue, setLocalValue] = useState(defaultValue)
  let isControlled = value != null // the key

  let activeIndex = isControlled ? value : localValue
  let setActiveIndex = nextIndex => {
    if (isControlled) {
      if (onChange) {
        onChange(nextIndex)
      } else {
        // bad spot... we should warn them!
      }
    } else {
      setLocalValue(nextIndex)
      if (onChange) {
        onChange(nextIndex)
      }
    }
  }

  return [activeIndex, setActiveIndex]
}

const TabsContext = React.createContext()

function Tabs2({
  children,
  defaultValue = 0,
  value,
  onChange,
}) {
  let [activeIndex, setActiveIndex] = useControl(
    defaultValue,
    value,
    onChange
  )

  return (
    <TabsContext.Provider
      value={{ activeIndex, setActiveIndex }}
    >
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabListContext = React.createContext()

function TabList({ children }) {
  let { activeIndex, setActiveIndex } = useContext(TabsContext)

  return (
    <div data-reach-tab-list>
      {React.Children.map(children, (child, index) => (
        <TabListContext.Provider
          value={{
            isActive: activeIndex === index,
            onActivate: () => setActiveIndex(index),
          }}
        >
          {child}
        </TabListContext.Provider>
      ))}
    </div>
  )
}

function Tab({
  children,
  disabled = false,
  isActive_,
  onActivate_,
}) {
  let { isActive, onActivate } = useContext(TabListContext)

  return (
    <div
      data-reach-tab
      className={
        disabled ? 'disabled' : isActive ? 'active' : ''
      }
      onClick={disabled ? undefined : onActivate}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  let { activeIndex } = useContext(TabsContext)
  let content = React.Children.toArray(children)[activeIndex]
  return <div data-reach-tab-panels>{content}</div>
}

function TabPanel({ children }) {
  return children
}

function App() {
  let [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <button onClick={() => setActiveIndex(1)}>
        Go to the signup tab
      </button>

      <Tabs2 value={activeIndex} onChange={setActiveIndex}>
        <div>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
        </div>
        <div>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </div>
      </Tabs2>
    </div>
  )

  // const tabData = [
  //   {
  //     label: 'Login',
  //     content: <LoginForm />,
  //   },
  //   {
  //     label: 'Signup',
  //     content: <SignupForm />,
  //     disabled: true,
  //   },
  // ]

  // return (
  //   <div>
  //     <Tabs data={tabData} tabsPosition="bottom" />
  //   </div>
  // )
}

export default App
