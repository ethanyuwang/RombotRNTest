import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

export const TouchableComponent = Platform.select({
	android: TouchableNativeFeedback,
	default: TouchableOpacity,
})