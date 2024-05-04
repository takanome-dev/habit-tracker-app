import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import { Text, Screen, Icon, Button } from "app/components"
import layout from "app/utils/layout"

import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

const existingHabits = [
  {
    emoji: "🧘",
    name: "Health",
    color: colors.palette.accent400,
  },
  {
    emoji: "🎨",
    name: "Arts",
    color: colors.palette.secondary400,
  },
  {
    emoji: "🏀",
    name: "Sports",
    color: colors.palette.neutral500,
  },
  {
    emoji: "💡",
    name: "Skills Development",
    color: colors.palette.neutral500,
  },
  {
    emoji: "🈯️",
    name: "Language",
    color: colors.palette.neutral500,
  },
  {
    emoji: "📚",
    name: "Mindfullness",
    color: colors.palette.neutral500,
  },
]

interface CreateHabitScreenProps extends AppStackScreenProps<"CreateHabit"> {}

export const CreateHabitScreen: FC<CreateHabitScreenProps> = observer(function CreateHabitScreen({
  navigation,
}) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <View style={$headerContainer}>
        <Icon icon="x" color={colors.text} onPress={() => navigation.goBack()} />
        <Text text="Add new habit" preset="heading" size="lg" />
      </View>
      <View style={$allHabitsContainer}>
        {existingHabits.map((habit, idx) => (
          <View key={`habit-${habit.name}-${idx}`} style={$habitContainer}>
            <View style={$habitLeftContainer}>
              <View style={$emojiContainer}>
                <Text text={habit.emoji} size="lg" style={$emojiText} />
              </View>
              <Text text={habit.name} preset="formLabel" size="md" />
            </View>
            <View style={$habitRightContainer}>
              <MaterialCommunityIcons name="plus" color={colors.palette.primary600} size={28} />
            </View>
          </View>
        ))}
        <View style={[$habitLeftContainer, { width: layout.window.width * 0.8 }]}>
          <View style={[$habitRightContainer, { backgroundColor: colors.palette.neutral100 }]}>
            <MaterialCommunityIcons
              name="plus"
              color={colors.palette.primary600}
              size={28}
              onPress={() => navigation.navigate("CreateNewHabit")}
            />
          </View>
          <Text text="Couldn’t find anything? Create a new habit" preset="formLabel" size="md" />
        </View>
      </View>
      <Button
        style={$btn}
        textStyle={{ color: colors.palette.neutral100 }}
        onPress={() => navigation.navigate("Welcome")}
      >
        Done
      </Button>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
  gap: spacing.xl,
}

const $allHabitsContainer: ViewStyle = {
  gap: 16,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 24,
}

const $habitContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: spacing.sm,
  borderRadius: spacing.xs,
  flexDirection: "row",
  justifyContent: "space-between",
}

const $habitLeftContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 15,
}

const $habitRightContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 99,
}

const $emojiContainer: ViewStyle = {
  backgroundColor: colors.background,
  width: 44,
  height: 44,
  borderRadius: 99,
  alignItems: "center",
  justifyContent: "center",
}

const $emojiText: TextStyle = {
  lineHeight: 0,
  textAlign: "center",
}

const $btn: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderWidth: 0,
  borderRadius: spacing.xs,
}
