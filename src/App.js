import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {Routers} from './routers'

const App = () => {
  return (
    <NavigationContainer>
      <Routers/>
    </NavigationContainer>
  )
}

export default App