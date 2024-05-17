import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Text, Screen, Icon, TextField, Button } from "app/components"

import { Link } from "app/screens/settings"
import { colors, spacing } from "app/theme"
import { SettingsScreenProps } from "app/navigators/types"

export const PersonalInfosScreen: FC<SettingsScreenProps<"PersonalInfos">> = observer(
  function PersonalInfosScreen({ navigation }) {
    return (
      <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$headerContainer}>
          <View style={$headerBackContainer}>
            <Icon icon="back" color={colors.text} onPress={() => navigation.goBack()} />
            <Text text="Personal Infos" preset="heading" size="lg" />
          </View>
          <Icon icon="pencil" size={16} onPress={() => navigation.navigate("EditPersonalInfos")} />
        </View>

        <View style={$generalContainer}>
          <Text text="General" preset="formLabel" />
          <View style={$generalLinksContainer}>
            <TextField
              label="FullName"
              value="EL Hadji Malick Seck"
              readOnly
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Email"
              value="elhadjimalick@gmail.com"
              readOnly
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Bio"
              value="Full Stack Developer | Open Source Enthusiast"
              readOnly
              multiline
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
          </View>
        </View>

        <View style={$generalContainer}>
          <Text text="Password" preset="formLabel" />
          <View style={$link}>
            <Link
              icon="lockFilled"
              title="Password"
              handleClick={() => navigation.navigate("EditPassword")}
              length={1}
              index={0}
            />
          </View>
        </View>

        <View style={$generalContainer}>
          <Text text="Social Links" preset="formLabel" />
          <View style={$generalLinksContainer}>
            <TextField
              label="Twitter/X"
              readOnly
              value="@takanome_dev"
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Linkedin"
              value="@takanome-dev"
              readOnly
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Facebook"
              readOnly
              value="@takanome-dev"
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Instagram"
              readOnly
              value="@takanome-dev"
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
          </View>
        </View>

        <Button
          style={$btn}
          textStyle={{ color: colors.palette.neutral100 }}
          onPress={() => navigation.navigate("EditPersonalInfos")}
        >
          Edit profile
        </Button>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  gap: spacing.xl,
  paddingBottom: 70,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $headerBackContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.md,
}

const $generalContainer: ViewStyle = {
  gap: spacing.md,
}

const $generalLinksContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.xs,
  padding: spacing.md,
  gap: spacing.lg,
}

const $link: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.xs,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
}

const $btn: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderWidth: 0,
  borderRadius: spacing.xs,
}
