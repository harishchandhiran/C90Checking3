import React from 'react'
import { createSwitchNavigator,createAppContainer } from "react-navigation";
import WelcomeScreen from './screens/WelcomeScreen'
import { AppDrawerNavigator } from './components/AppDrawerNavigator'

export default function App() {
  return (
    <AppContainer/>
  )
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  AppDrawerNavigator: {screen: AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator);