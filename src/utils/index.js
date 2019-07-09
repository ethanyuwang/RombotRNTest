import {Platform, Dimensions} from 'react-native'

const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const PAD_WIDTH = 768
const PAD_HEIGHT = 1024

const IPADPRO11_WIDTH = 834;
const IPADPRO11_HEIGHT = 1194;
const IPADPRO129_HEIGHT = 1024;
const IPADPRO129_WIDTH = 1366;

export const isIphoneX = () => {
  if (Platform.OS === 'web') return false

  const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window')

  return (
    Platform.OS === 'ios' &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
}

//header, status bar, and bottom safe area heights
export const STATUS_BAR_HEIGHGT_ANDROID = 0
export const STATUS_BAR_HEIGHT_IOS = isIphoneX() ? 44 : 22
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? STATUS_BAR_HEIGHT_IOS : STATUS_BAR_HEIGHGT_ANDROID
export const HEADER_INNER_HEIGHT = (Platform.OS === 'ios' ? 48 : 58) 
export const HEADER_HEIGHT = HEADER_INNER_HEIGHT + STATUS_BAR_HEIGHT

export const BOTTOM_SAFE_HEIGHT = isIphoneX() ? 34 : 0
