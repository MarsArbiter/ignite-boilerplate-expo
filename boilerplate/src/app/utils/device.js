import {Dimensions, Platform, PixelRatio} from 'react-native'

export default {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  isIOS: Platform.OS === 'ios',
  scaleSize: (uiWidth) => {
    // base on 375
    const width = Dimensions.get(Platform.OS === 'ios' ? 'window' : 'window').width
    return (width / 375) * uiWidth
  },
  scaleFont: fontSize => Math.round(fontSize * (PixelRatio.get() / PixelRatio.getFontScale())),
}

