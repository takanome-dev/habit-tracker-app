import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Text, Screen, Icon, TextField, Button } from "app/components"

import { colors, spacing } from "app/theme"
import { SettingsScreenProps } from "app/navigators/types"

export const EditPasswordScreen: FC<SettingsScreenProps<"EditPassword">> = observer(
  function EditPasswordScreen({ navigation }) {
    const [infos, setInfos] = React.useState({
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    })

    return (
      <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <View style={$headerContainer}>
          <Icon icon="back" color={colors.text} onPress={() => navigation.goBack()} />
          <Text text="Edit password" preset="heading" size="lg" />
        </View>

        <View style={$generalLinksContainer}>
          <TextField
            label="Current password"
            value={infos.current_password}
            secureTextEntry
            onChangeText={(text) => setInfos({ ...infos, ["current_password"]: text })}
            inputWrapperStyle={{
              borderRadius: spacing.xs,
              backgroundColor: colors.palette.neutral100,
            }}
          />
          <TextField
            label="New password"
            secureTextEntry
            value={infos.new_password}
            onChangeText={(text) => setInfos({ ...infos, ["new_password"]: text })}
            inputWrapperStyle={{
              borderRadius: spacing.xs,
              backgroundColor: colors.palette.neutral100,
            }}
          />
          <TextField
            label="Confirm new password"
            secureTextEntry
            value={infos.confirm_new_password}
            onChangeText={(text) => setInfos({ ...infos, ["confirm_new_password"]: text })}
            inputWrapperStyle={{
              borderRadius: spacing.xs,
              backgroundColor: colors.palette.neutral100,
            }}
          />
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
