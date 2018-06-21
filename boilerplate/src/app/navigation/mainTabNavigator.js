import React from 'react'
import {Image} from 'react-native'
import {
  createBottomTabNavigator
} from 'react-navigation'
import Example from '../screens/example'

function createTabIcon(icon, hicon) {
  return ({focused: focused, /*tintColor: tintColor*/}) => {
    const cicon = focused ? hicon : icon
    return <Image source={cicon}/>
  }
}

export const screens = {
  Tab1: {
    screen: Example,
    navigationOptions: {
      tabBarLabel: 'Tab1',
      // tabBarIcon: createTabIcon(require('../../assets/icon.png'), require('../../assets/icon.png'))
    }
  }
}

export const config = {
  tabBarOptions: {
    // showLabel: false,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      // backgroundColor: 'blue',
    },
  }
}


export default {
  screens,
  config
}
