import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"

import { Text, Screen, Icon, Toggle, IconTypes } from "app/components"
import layout from "app/utils/layout"

import { SettingsScreenProps } from "../navigators/types"
import { colors, spacing } from "../theme"

interface GeneralLinkType {
  title: string
  icon: IconTypes
  id?: number
  to?: string
}

const generalLinks: GeneralLinkType[] = [
  {
    title: "Personal Infos",
    icon: "user",
    id: 1,
    to: "Edit Profile",
  },
  {
    title: "Dark Mode",
    icon: "toggle",
    id: 2,
  },
  {
    title: "Notifications",
    icon: "bellFilled",
    id: 3,
    to: "Notifications",
  },
  {
    title: "Security",
    icon: "lockFilled",
    id: 4,
    to: "Security",
  },
  {
    title: "Language",
    icon: "globe",
    id: 5,
    to: "Language",
  },
]

const aboutLinks: GeneralLinkType[] = [
  {
    title: "About",
    icon: "alert",
    id: 6,
    to: "About Us",
  },
  {
    title: "Rate Us",
    icon: "star",
    id: 7,
    to: "Rating",
  },
  {
    title: "Support",
    icon: "support",
    id: 8,
    to: "Support",
  },
]

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen({
  navigation,
}) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <Text text="Settings" preset="subheading" size="xl" />
      <View style={$topContainer}>
        <Icon icon="avatar" />
        <View style={$userInfosContainer}>
          <View>
            <Text text="El Hadji Malick Seck" preset="subheading" />
            <Text text="elhadjimalick@gmail.com" size="xs" style={{ color: colors.textDim }} />
          </View>
          <TouchableOpacity onPress={() => console.log("edit")}>
            <Icon icon="pencil" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={$generalContainer}>
        <Text text="General" preset="formLabel" />
        <View style={$generalLinksContainer}>
          {generalLinks.map((l, idx) => (
            <Link
              key={`${l.id}-${l.to}`}
              icon={l.icon}
              title={l.title}
              // TODO: type the to prop (path to the page)
              handleClick={() => navigation.navigate(l.to as any)}
              length={generalLinks.length}
              index={idx}
            />
          ))}
        </View>
      </View>

      <View style={$generalContainer}>
        <Text text="About Us" preset="formLabel" />
        <View style={$generalLinksContainer}>
          {aboutLinks.map((l, idx) => (
            <Link
              key={`${l.id}-${l.to}`}
              icon={l.icon}
              title={l.title}
              // TODO: type the to prop (path to the page)
              handleClick={() => navigation.navigate(l.to as any)}
              length={aboutLinks.length}
              index={idx}
            />
          ))}
        </View>
      </View>
    </Screen>
  )
})

interface LinkProps extends GeneralLinkType {
  length: number
  index: number
  handleClick: () => void
}

function Link(props: LinkProps) {
  const { icon, title, length, index, handleClick } = props

  return (
    <View style={{ gap: spacing.md }}>
      <TouchableOpacity style={$generalLink} onPress={handleClick}>
        <View style={$generalName}>
          <Icon icon={icon} />
          <Text text={title} />
        </View>
        {title === "Dark Mode" ? (
          <Toggle
            variant="switch"
            // value={}
            // onValueChange={() => setReminder(reminder ? "" : "30 minutes before")}
            inputInnerStyle={{
              backgroundColor: colors.palette.neutral100,
            }}
            inputOuterStyle={{
              backgroundColor: colors.palette.neutral400,
            }}
          />
        ) : (
          <Icon icon="caretRight" />
        )}
      </TouchableOpacity>
      {length !== index + 1 && <View style={$separator} />}
    </View>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  gap: spacing.xl,
  flex: 1,
  paddingBottom: 70,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.xs,
  paddingTop: spacing.xs,
  paddingBottom: spacing.xs,
  paddingHorizontal: spacing.md,
  maxWidth: layout.window.width * 0.95,
}

const $userInfosContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: layout.window.width * 0.65,
}

const $generalContainer: ViewStyle = {
  gap: spacing.md,
}

const $generalLinksContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: spacing.md,
  borderRadius: spacing.xs,
  gap: spacing.lg,
}

const $generalLink: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $generalName: ViewStyle = {
  flexDirection: "row",
  gap: spacing.md,
  alignItems: "center",
}

const $separator: ViewStyle = {
  width: "100%",
  height: 1,
  backgroundColor: colors.palette.neutral200,
}
