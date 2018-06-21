import {
  createBottomTabNavigator
} from 'react-navigation'
import mainTab from './mainTabNavigator'

export const screens = {
  main: {
    screen: createBottomTabNavigator(mainTab.screens, mainTab.config),
    navigationOptions: {}
  },
}

export const config = {
  initialRouteName: 'main',
}

export default {
  screens,
  config
}
