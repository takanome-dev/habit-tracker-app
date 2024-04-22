import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, ScrollView } from "react-native"
import { Text } from "app/components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const $insets = useSafeAreaInsetsStyle(["bottom", "top"])
  console.log({ insets: $insets })

  return (
    <ScrollView contentContainerStyle={[$container, $insets]}>
      <Text style={$welcomeHeading} tx="homeScreen.hello" txt="Nilou!" preset="heading" />

      <View>
        <ScrollView
          contentContainerStyle={$topContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.background,
                  width: 60,
                  height: 80,
                  borderRadius: 10,
                }}
                key={i}
              />
              <Text text="🤔" />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ marginTop: spacing.md }}>
        <Text tx="homeScreen.check_in" preset="subheading" />
        <View>
          <ScrollView
            contentContainerStyle={$middleContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <View
                style={{
                  backgroundColor: colors.background,
                  width: 200,
                  height: 300,
                  borderRadius: 10,
                }}
                key={i}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={{ marginTop: spacing.md }}>
        <Text tx="homeScreen.today" preset="subheading" />
        <View style={$bottomContainer}>
          {Array.from({ length: 7 }).map((_, i) => (
            <View
              style={{ backgroundColor: colors.background, padding: spacing.sm, borderRadius: 10 }}
            >
              <Text text="Avoid sweets" />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.primary100,
  paddingHorizontal: spacing.lg,
}

const $topContainer: ViewStyle = {
  marginVertical: spacing.md,
  gap: 10,
}

const $middleContainer: ViewStyle = {
  marginVertical: spacing.md,
  gap: 20,
}

const $bottomContainer: ViewStyle = {
  marginVertical: spacing.md,
  gap: 10,
}

const $welcomeHeading: TextStyle = {}
