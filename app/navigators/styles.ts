import { colors, spacing } from "app/theme"
import { ViewStyle } from "react-native"

export const $tabBarStyles: ViewStyle = {
  position: "absolute",
  bottom: 25,
  left: 30,
  right: 30,
  height: 60,
  borderRadius: spacing.lg,
  shadowColor: colors.text,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}
