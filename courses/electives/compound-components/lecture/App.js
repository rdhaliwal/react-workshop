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

// remove contents of preferences.json if you have that filled
// npm start lecture
// choose "electives"
// choose "compound components"

function Tabs({
  data,
  tabsPosition = 'top',
  disabled = [],
}) {
  const tabs = (
    <TabList>
      {data.map((item, index) => {
        return (
          <Tab
            key={'tab-' + index}
            disabled={disabled.includes(index)}
          >
            {item.label}
          </Tab>
        )
      })}
    </TabList>
  )

  const panels = (
    <TabPanels>
      {data.map((item, index) => {
        return (
          <TabPanel key={'tabpanel-' + index}>
            {item.content}
          </TabPanel>
        )
      })}
    </TabPanels>
  )

  return (
    <Tabs2>
      {tabsPosition === 'bottom'
        ? [panels, tabs]
        : [tabs, panels]}
    </Tabs2>
  )
}

const TabsContext = createContext()

function Tabs2({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <TabsContext.Provider
      value={{ activeIndex, setActiveIndex }}
    >
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabListContext = createContext()
function TabList({ children }) {
  return (
    <div data-reach-tab-list>
      {Children.map(children, (child, index) => {
        return (
          <TabListContext.Provider
            key={'tablist' + index}
            value={{ index }}
          >
            {child}
          </TabListContext.Provider>
        )
      })}
    </div>
  )
}

function Tab({ children, disabled }) {
  const { index } = useContext(TabListContext)
  const { activeIndex, setActiveIndex } = useContext(
    TabsContext
  )
  const isActive = index === activeIndex

  return (
    <div
      data-reach-tab
      className={
        disabled ? 'disabled' : isActive ? 'active' : ''
      }
      onClick={() => {
        if (!disabled) setActiveIndex(index)
      }}
    >
      {children}
    </div>
  )
}
function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return (
    <div data-reach-tab-panels>{children[activeIndex]}</div>
  )
}
function TabPanel({ children }) {
  return children
}

// ui.reach.tech
// https://reacttraining.com/reach-ui/tabs

function App() {
  return (
    <Tabs2>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LoginForm />
        </TabPanel>
        <TabPanel>
          <SignupForm />
        </TabPanel>
      </TabPanels>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
    </Tabs2>
  )
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />,
    },
    {
      label: 'Signup',
      content: <SignupForm />,
    },
  ]

  return (
    <div>
      <Tabs data={tabData} tabsPosition="top" />
    </div>
  )
}

export default App
