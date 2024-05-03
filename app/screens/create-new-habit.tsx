import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import EmojiPicker from "rn-emoji-keyboard"
import ColorPicker, { HueSlider, Panel1, Preview } from "reanimated-color-picker"
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"

import { Text, Screen, Icon, Button, TextField } from "app/components"
import layout from "app/utils/layout"

import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const days = ["S", "M", "T", "W", "T", "F", "S"]

interface CreateNewHabitScreenProps extends AppStackScreenProps<"CreateNewHabit"> {}

export const CreateNewHabitScreen: FC<CreateNewHabitScreenProps> = observer(
  function CreateNewHabitScreen({ navigation }) {
    const [open, setOpen] = React.useState(false)
    const [selectedEmoji, setSelectedEmoji] = React.useState("📚")
    const [colorPicked, setColorPicked] = React.useState("#ff0000")

    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null)

    const handlePresentModalPress = React.useCallback(() => {
      bottomSheetModalRef.current?.present()
    }, [])

    const renderBackdrop = React.useCallback(
      (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
      [],
    )

    return (
      <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
        <BottomSheetModalProvider>
          <View style={$headerContainer}>
            <Icon icon="back" color={colors.text} onPress={() => navigation.goBack()} />
            <Text text="Create personal habit" preset="heading" size="lg" />
          </View>
          <View style={$subheaderContainer}>
            <TouchableOpacity style={$pillContainer} onPress={() => setOpen(!open)}>
              <Text text={selectedEmoji} />
              <Text text="icon" preset="formLabel" size="md" />
            </TouchableOpacity>
            <EmojiPicker
              onEmojiSelected={(selected) => setSelectedEmoji(selected.emoji)}
              open={open}
              onClose={() => setOpen(!open)}
            />
            <TouchableOpacity style={$pillContainer} onPress={handlePresentModalPress}>
              <View style={[$pickedColor, { backgroundColor: colorPicked }]} />
              <Text text="color" preset="formLabel" size="md" />
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={[200, "50%"]}
              backdropComponent={renderBackdrop}
            >
              <BottomSheetView style={$bottomSheet}>
                <ColorPicker
                  style={$colorPicker}
                  value="red"
                  onComplete={({ hex }) => setColorPicked(hex)}
                >
                  <Panel1 />
                  <HueSlider />
                  <Preview />
                </ColorPicker>
              </BottomSheetView>
            </BottomSheetModal>
          </View>

          <View style={$inputsContainer}>
            <TextField label="Habit Name" placeholder="Go to the GYM" required />
            <TextField label="Description" placeholder="Extra details" />
          </View>
          <View style={{ gap: 8 }}>
            <View style={$frequencyContainer}>
              <Text preset="formLabel" text="Frequency" style={$labelStyle} />
              <Text text="*" style={$labelRequired} />
            </View>
            <View style={$daysContainer}>
              {days.map((d, idx) => (
                <View key={`day-${d}-${idx}`} style={$dayContainerStyle}>
                  <Text text={d} style={$dayStyle} size="md" />
                </View>
              ))}
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <View style={$frequencyContainer}>
              <Text preset="formLabel" text="Habit time" style={$labelStyle} />
              <Text text="*" style={$labelRequired} />
            </View>
            <View style={$daysContainer}>
              {days.map((d, idx) => (
                <View key={`day-${d}-${idx}`} style={$dayContainerStyle}>
                  <Text text={d} style={$dayStyle} size="md" />
                </View>
              ))}
            </View>
          </View>
          <Button style={$btn} textStyle={{ color: colors.palette.neutral100 }}>
            Create habit
          </Button>
        </BottomSheetModalProvider>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  gap: spacing.xl,
  flex: 1,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 24,
}

const $btn: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderWidth: 0,
  borderRadius: spacing.xs,
}

const $pillContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.xs,
  padding: spacing.xs,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  width: layout.window.width * 0.25,
}

const $subheaderContainer: ViewStyle = {
  flexDirection: "row",
  gap: 24,
}

const $pickedColor: ViewStyle = { width: 18, height: 18, borderRadius: 99 }

const $bottomSheet: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $colorPicker: ViewStyle = { width: "50%", gap: 8 }

const $inputsContainer: ViewStyle = {
  gap: 16,
}

const $frequencyContainer: ViewStyle = {
  flexDirection: "row",
  gap: 4,
}

const $labelStyle: TextStyle = { marginBottom: spacing.xs }

const $labelRequired: TextStyle = {
  color: colors.error,
}

const $daysContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $dayContainerStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 99,
  width: 44,
  height: 44,
  justifyContent: "center",
  alignItems: "center",
}

const $dayStyle: TextStyle = {
  lineHeight: 0,
  textAlign: "center",
}
