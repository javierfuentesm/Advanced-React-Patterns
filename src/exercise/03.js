// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import {
  useState,
  useContext,
  Children,
  cloneElement,
  createContext,
} from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
const ToggleContext = createContext()

function Toggle({children}) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
  // return Children.map(children, child => {
  //   return typeof child.type === 'string'
  //     ? child
  //     : cloneElement(child, {on, toggle})
  // })
}

const useToggle = () => {
  const context = useContext(ToggleContext)
  if (!context) {
    throw new Error('useToggle must be rendered within the ToogleProvider')
  }
  return context
}

function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

function ToggleButton(props) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
