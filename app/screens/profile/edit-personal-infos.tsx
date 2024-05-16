import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"

import { Text, Screen, Icon, Toggle, IconTypes, TextField, Button } from "app/components"
import layout from "app/utils/layout"

import { Link } from "app/screens/settings"
import { colors, spacing } from "app/theme"
import { SettingsScreenProps } from "app/navigators/types"

export const EditPersonalInfosScreen: FC<SettingsScreenProps<"EditPersonalInfos">> = observer(
  function EditPersonalInfosScreen({ navigation }) {
    const [infos, setInfos] = React.useState({
      fullName: "El Hadji Malick Seck",
      email: "elhadjimalick@gmail.com",
      bio: "Full Stack Dev",
      twitter: "@takanome_dev",
      linkedin: "@takanome_dev",
      instagram: "@takanome_dev",
      facebook: "@takanome_dev",
    })

    return (
      <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$headerContainer}>
          <Icon icon="back" color={colors.text} onPress={() => navigation.goBack()} />
          <Text text="Edit personal infos" preset="heading" size="lg" />
        </View>

        <View style={$generalContainer}>
          <Text text="General" preset="formLabel" />
          <View style={$generalLinksContainer}>
            <TextField
              label="FullName"
              value={infos.fullName}
              onChangeText={(text) => setInfos({ ...infos, ["fullName"]: text })}
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Email"
              keyboardType="email-address"
              value={infos.email}
              onChangeText={(text) => setInfos({ ...infos, ["email"]: text })}
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Bio"
              value={infos.bio}
              onChangeText={(text) => setInfos({ ...infos, ["bio"]: text })}
              multiline
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
          </View>
        </View>

        <View style={$generalContainer}>
          <Text text="Social Links" preset="formLabel" />
          <View style={$generalLinksContainer}>
            <TextField
              label="Twitter/X"
              value={infos.twitter}
              onChangeText={(text) => setInfos({ ...infos, ["twitter"]: text })}
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Linkedin"
              value={infos.linkedin}
              onChangeText={(text) => setInfos({ ...infos, ["linkedin"]: text })}
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Facebook"
              value={infos.facebook}
              onChangeText={(text) => setInfos({ ...infos, ["facebook"]: text })}
              inputWrapperStyle={{
                borderRadius: spacing.xs,
                backgroundColor: colors.palette.neutral100,
              }}
            />
            <TextField
              label="Instagram"
              value={infos.instagram}
              onChangeText={(text) => setInfos({ ...infos, ["instagram"]: text })}
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
          onPress={() => navigation.navigate("PersonalInfos")}
        >
          Save changes
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

const $btn: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderWidth: 0,
  borderRadius: spacing.xs,
}
