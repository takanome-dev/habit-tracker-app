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
import DateTimePicker from "@react-native-community/datetimepicker"

import { Text, Screen, Icon, Button, TextField, Toggle } from "app/components"
import layout from "app/utils/layout"

import { HomeStackScreenProps } from "../navigators/types"
import { colors, spacing } from "../theme"

export const days = [
  {
    day: "Sunday",
    abbr: "S",
  },
  {
    day: "Monday",
    abbr: "M",
  },
  {
    day: "Tuesday",
    abbr: "T",
  },
  {
    day: "Wednesday",
    abbr: "W",
  },
  {
    day: "Thursday",
    abbr: "T",
  },
  {
    day: "Friday",
    abbr: "F",
  },
  {
    day: "Saturday",
    abbr: "S",
  },
]

export const reminders = [
  {
    id: 1,
    name: "At the habit time",
  },
  {
    id: 2,
    name: "5 minutes before",
  },
  {
    id: 3,
    name: "10 minutes before",
  },
  {
    id: 4,
    name: "15 minutes before",
  },
  {
    id: 5,
    name: "30 minutes before",
  },
]

interface CreateNewHabitScreenProps extends HomeStackScreenProps<"CreateNewHabit"> {}

export const CreateNewHabitScreen: FC<CreateNewHabitScreenProps> = observer(
  function CreateNewHabitScreen({ navigation }) {
    const [open, setOpen] = React.useState(false)
    const [reminder, setReminder] = React.useState("")
    const [selectedEmoji, setSelectedEmoji] = React.useState("📚")
    const [colorPicked, setColorPicked] = React.useState("#ff0000")
    const [habitTime, setHabitTime] = React.useState(new Date())
    const [frequency, setFrequency] = React.useState<(typeof days)[0][]>([])

    const bottomSheetColorRef = React.useRef<BottomSheetModal>(null)
    const bottomSheetReminderRef = React.useRef<BottomSheetModal>(null)

    const handleOpenColorSheet = React.useCallback(() => {
      bottomSheetColorRef.current?.present()
    }, [])
    const handleOpenReminderSheet = React.useCallback(() => {
      bottomSheetReminderRef.current?.present()
    }, [])

    const renderBackdrop = React.useCallback(
      (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
      [],
    )

    const handleSelectFrequency = (day: (typeof days)[0]) => {
      let newFrequency = [...frequency]
      const found = newFrequency.findIndex((f) => f.day === day.day)
      if (found === -1) {
        newFrequency.push(day)
      } else {
        newFrequency = newFrequency.filter((f) => f.day !== day.day)
      }

      setFrequency(newFrequency)
    }

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
            <TouchableOpacity style={$pillContainer} onPress={handleOpenColorSheet}>
              <View style={[$pickedColor, { backgroundColor: colorPicked }]} />
              <Text text="color" preset="formLabel" size="md" />
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetColorRef}
              snapPoints={[300, "50%"]}
              backdropComponent={renderBackdrop}
              style={$bottomSheetContainer}
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
          <View style={$gap}>
            <View style={$frequencyContainer}>
              <Text preset="formLabel" text="Frequency" style={$labelStyle} />
              <Text text="*" style={$labelRequired} />
            </View>
            <View style={$daysContainer}>
              {days.map((d, idx) => (
                <TouchableOpacity
                  key={`day-${d.day}-${idx}`}
                  style={[
                    $dayContainerStyle,
                    {
                      backgroundColor: frequency.find((f) => f.day === d.day)
                        ? colors.palette.primary600
                        : colors.palette.neutral100,
                    },
                  ]}
                  onPress={() => handleSelectFrequency(d)}
                >
                  <Text
                    text={d.abbr}
                    style={[
                      $dayStyle,
                      {
                        color: frequency.find((f) => f.day === d.day)
                          ? colors.palette.neutral100
                          : colors.text,
                      },
                    ]}
                    size="md"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={$gap}>
            <View style={$frequencyContainer}>
              <Text preset="formLabel" text="Habit time" style={$labelStyle} />
              <Text text="*" style={$labelRequired} />
            </View>
            <DateTimePicker
              testID="dateTimePicker"
              style={$dateTimePicker}
              value={habitTime}
              mode="time"
              is24Hour={false}
              locale="en-US"
              accentColor={colors.palette.neutral100}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onChange={(_, selectedDate) => setHabitTime(new Date(selectedDate!))}
            />
          </View>
          <View style={$gap}>
            <View style={$remindersContainer}>
              <Text preset="formLabel" text="Reminders" style={$labelStyle} />
              <Toggle
                variant="switch"
                value={!!reminder}
                onValueChange={() => setReminder(reminder ? "" : "30 minutes before")}
                inputInnerStyle={{
                  backgroundColor: reminder ? colors.success : colors.palette.neutral100,
                }}
                inputOuterStyle={{
                  backgroundColor: colors.palette.neutral400,
                }}
              />
            </View>
            {reminder && (
              <TouchableOpacity style={$reminder} onPress={() => handleOpenReminderSheet()}>
                <Text text={reminder} size="md" />
                <Icon icon="caretRight" />
              </TouchableOpacity>
            )}
            <BottomSheetModal
              ref={bottomSheetReminderRef}
              snapPoints={[200, "50%"]}
              backdropComponent={renderBackdrop}
            >
              <BottomSheetView style={$reminderBottomSheet}>
                {reminders.map((r, idx) => (
                  <TouchableOpacity
                    key={`reminder-${r.id}-${idx}`}
                    style={$gap}
                    onPress={() => {
                      setReminder(r.name)
                      bottomSheetReminderRef.current?.close()
                    }}
                  >
                    <Text text={r.name} size="md" style={{ marginLeft: spacing.md }} />
                    <View style={$separator} />
                  </TouchableOpacity>
                ))}
              </BottomSheetView>
            </BottomSheetModal>
          </View>
          <Button
            style={$btn}
            textStyle={{ color: colors.palette.neutral100 }}
            onPress={() => navigation.navigate("Home")}
          >
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
  paddingBottom: 70,
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

const $gap: ViewStyle = { gap: 8 }

const $dateTimePicker: ViewStyle = {
  alignSelf: "flex-start",
  // backgroundColor: colors.palette.neutral100,
}

const $remindersContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $reminder: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  padding: spacing.sm,
  borderRadius: spacing.xs,
  marginTop: spacing.xs,
}

const $reminderBottomSheet: ViewStyle = {
  flex: 1,
  gap: spacing.lg,
  padding: spacing.sm,
  marginTop: spacing.xs,
  backgroundColor: colors.palette.neutral100,
}

const $separator: ViewStyle = { width: "100%", height: 2, backgroundColor: colors.background }

const $bottomSheetContainer: ViewStyle = {
  shadowColor: colors.text,
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,
  elevation: 24,
}
