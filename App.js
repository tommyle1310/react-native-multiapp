import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/Navigation/Navigation'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'


const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App