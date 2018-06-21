
import {
  createStackNavigator,
} from 'react-navigation'
import React from 'react'

import mainStack from './mainStackNavigator'

export const MainStack = createStackNavigator(mainStack.screens, mainStack.config)

export default {
  MainStack
}

