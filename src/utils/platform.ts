import { Platform, Dimensions } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isMobilePlatform = isIOS || isAndroid;

export const getWindowDimensions = () => Dimensions.get('window');

export const isMobileViewport = () => {
  const { width } = Dimensions.get('window');
  return width < 768;
};
