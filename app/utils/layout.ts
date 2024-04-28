import { Dimensions, Platform } from "react-native"

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default {
  window: {
    width,
    height,
    paddingTop: Platform.OS === "ios" ? 0 : 0,
    headerHeight: Platform.OS === "ios" ? 100 : 60,
  },
  isSmallDevice: width < 375,
  numberOfColumn: width < 375 ? 1 : 2,
}
