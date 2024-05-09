import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { AnimatedCircularProgress } from "react-native-circular-progress"

import { Card, Text, Toggle, Screen, Icon } from "app/components"
import layout from "app/utils/layout"
import {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet"

import { navigate } from "../navigators"
import { colors, spacing } from "../theme"
import { days } from "app/screens/create-new-habit"
import { HomeStackScreenProps } from "app/navigators/types"

const checkIns = [
  {
    emoji: "💧",
    title: "Water",
    name: "glass",
    amount: "3/4",
    color: colors.palette.accent400,
    fill: 30,
  },
  {
    emoji: "😴",
    title: "Sleep",
    name: "hours",
    amount: "4/6",
    color: colors.palette.secondary400,
    fill: 80,
  },
  {
    emoji: "🧘",
    title: "Meditation",
    name: "min",
    amount: "10/15",
    color: colors.palette.neutral500,
    fill: 60,
  },
]

interface HabitType {
  id: number
  emoji: string
  name: string
  time: string
  finished: boolean
}

export const tasks: HabitType[] = [
  {
    id: 1,
    emoji: "🧘",
    name: "Meditation",
    time: "08:00 AM",
    finished: true,
  },
  {
    id: 2,
    emoji: "🌱",
    name: "Plant based diet",
    time: "10:00 AM",
    finished: false,
  },
  {
    id: 3,
    emoji: "💻",
    name: "Contribute to open source",
    time: "10:30 AM",
    finished: false,
  },
  {
    id: 4,
    emoji: "🏃",
    name: "Workout",
    time: "08:00 PM",
    finished: true,
  },
]

interface DayCardProps {
  day: string
  date: string
  progress: number
}

const $dayCard: ViewStyle = { gap: 8 }

const DayCard = ({ day, date, progress }: DayCardProps) => (
  <View style={$dayCard}>
    <Text text={day} />
    <AnimatedCircularProgress
      size={32}
      width={3}
      fill={progress}
      tintColor={colors.palette.primary400}
      backgroundColor={colors.palette.neutral100}
    >
      {() => <Text text={date} size="xs" />}
    </AnimatedCircularProgress>
  </View>
)

interface HomeScreenProps extends HomeStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <BottomSheetModalProvider>
        <View style={$headerContainer}>
          <View style={$imageContainer}>
            <Image source={require("../../assets/images/avatar-2.png")} style={$image} />
            <Text text="Today" size="xl" weight="bold" />
          </View>
          <View style={$headerBtn}>
            <MaterialCommunityIcons
              name="plus"
              color={colors.palette.neutral100}
              size={28}
              onPress={() => navigation.navigate("CreateHabit")}
            />
          </View>
        </View>

        <View style={$topContainer}>
          <DayCard day="Mon" date="1" progress={50} />
          <DayCard day="Tue" date="2" progress={75} />
          <DayCard day="Wed" date="3" progress={25} />
          <DayCard day="Thu" date="4" progress={100} />
          <DayCard day="Fri" date="5" progress={60} />
          <DayCard day="Sat" date="6" progress={80} />
          <DayCard day="Sun" date="7" progress={90} />
        </View>

        <View style={{ gap: spacing.md }}>
          <Text tx="homeScreen.check_in" preset="subheading" />
          <View>
            <ScrollView
              contentContainerStyle={$middleContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {checkIns.map((checkIn, i) => (
                <Card
                  key={`${checkIn.title}-${i}`}
                  style={$cardContainer}
                  verticalAlignment="space-between"
                  wrapperStyle={{ padding: spacing.sm }}
                  HeadingComponent={
                    <View style={$headingContainer}>
                      <View style={$emojiContainer}>
                        <Text text={checkIn.emoji} size="xl" style={$emojiText} />
                      </View>
                      <Text text={checkIn.title} size="md" />
                    </View>
                  }
                  ContentComponent={
                    <AnimatedCircularProgress
                      size={95}
                      width={10}
                      fill={checkIn.fill}
                      rotation={360}
                      tintColor={checkIn.color}
                      backgroundColor={colors.palette.neutral200}
                      style={$circularProgressContainer}
                    >
                      {() => (
                        <View style={$circularProgressChildren}>
                          <Text text={checkIn.amount} size="md" />
                          <Text text={checkIn.name} size="xs" />
                        </View>
                      )}
                    </AnimatedCircularProgress>
                  }
                  FooterComponent={
                    <View style={$footerContainer}>
                      <MaterialCommunityIcons name="minus" color={colors.palette.neutral500} />
                      <Text text="|" style={{ color: colors.palette.neutral500 }} />
                      <MaterialCommunityIcons name="plus" color={colors.palette.neutral500} />
                    </View>
                  }
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{ gap: spacing.md }}>
          <Text tx="homeScreen.today" preset="subheading" />
          <View style={$bottomContainer}>
            {tasks.map((task, idx) => (
              <Habit key={`${task.id}-${idx}`} task={task} />
            ))}
          </View>
        </View>
      </BottomSheetModalProvider>
    </Screen>
  )
})

function Habit({ task }: { task: HabitType }) {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null)

  const handleOpenSheet = React.useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  const renderBackdrop = React.useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />,
    [],
  )

  return (
    <>
      <TouchableOpacity
        style={[
          $taskContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            opacity: task.finished ? 0.6 : 1,
          },
        ]}
        onPress={handleOpenSheet}
      >
        <View style={$taskLeftContainer}>
          <View style={$taskEmojiContainer}>
            <Text text={task.emoji} size="lg" style={$emojiText} />
          </View>

          <View style={{}}>
            <Text text={task.name} />
            <Text text={`start at ${task.time}`} size="xs" style={{ color: colors.textDim }} />
          </View>
        </View>
        <Toggle variant="checkbox" inputOuterStyle={$checkboxInput} value={task.finished} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={[500, "70%"]}
        backdropComponent={renderBackdrop}
        style={$bottomSheetContainer}
      >
        <BottomSheetView style={$bottomSheet}>
          <View style={$bottomSheetIcons}>
            <View style={$taskEmojiContainer}>
              <Text text={task.emoji} size="lg" style={$emojiText} />
            </View>
            <View style={$taskEmojiContainer}>
              <Icon
                icon="pencil"
                size={16}
                onPress={() =>
                  navigate("EditHabit", {
                    habitId: 1,
                  })
                }
              />
            </View>
          </View>
          <Text text={task.name} preset="heading" size="xl" />
          <View style={$daysContainer}>
            {days?.map((d, idx) => (
              <View key={`day-${d.day}-${idx}`} style={$dayContainerStyle}>
                <Text text={d.abbr} style={$dayStyle} size="md" />
              </View>
            ))}
          </View>
          <View style={{ marginBottom: spacing.md }}>
            <View style={$frequencyContainer}>
              <Text preset="formLabel" text="Habit time" style={$labelStyle} />
              <Text text="*" style={$labelRequired} />
            </View>
            <View
              style={{
                backgroundColor: colors.palette.neutral200,
                width: layout.window.width * 0.25,
                padding: spacing.sm,
                borderRadius: spacing.sm,
              }}
            >
              <Text text="06:00 PM" />
            </View>
          </View>
          <View>
            <View style={{}}>
              <Text preset="formLabel" text="Reminders" style={$labelStyle} />
            </View>
            <View style={$reminder}>
              <Text text="30 minutes before" size="md" />
              <Icon icon="caretRight" />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  gap: spacing.xl,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  gap: 18,
}

const $middleContainer: ViewStyle = {
  gap: 20,
}

const $bottomContainer: ViewStyle = {
  gap: 10,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $imageContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
}

const $headerBtn: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 99,
}

const $image: ImageStyle = {
  width: 50,
  height: 50,
}

const $cardContainer: ViewStyle = {
  borderWidth: 0,
  width: layout.window.width * 0.5,
  height: layout.window.height * 0.32,
}

const $headingContainer: ViewStyle = { flexDirection: "row", alignItems: "center", gap: 15 }

const $emojiContainer: ViewStyle = {
  backgroundColor: colors.background,
  width: 48,
  height: 48,
  borderRadius: 99,
  alignItems: "center",
  justifyContent: "center",
}

const $emojiText: TextStyle = {
  lineHeight: 0,
  textAlign: "center",
}

const $circularProgressContainer: ViewStyle = { alignSelf: "center" }

const $circularProgressChildren: ViewStyle = { alignItems: "center" }

const $footerContainer: ViewStyle = {
  backgroundColor: colors.background,
  padding: spacing.xs,
  borderRadius: 10,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}

const $taskContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderRadius: spacing.sm,
}

const $taskLeftContainer: ViewStyle = {
  flexDirection: "row",
  gap: 15,
}

const $taskEmojiContainer: ViewStyle = {
  backgroundColor: colors.background,
  width: 44,
  height: 44,
  borderRadius: 99,
  alignItems: "center",
  justifyContent: "center",
}

const $checkboxInput: ViewStyle = {
  borderColor: colors.text,
  backgroundColor: colors.palette.neutral100,
  borderWidth: 1,
}

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

const $bottomSheet: ViewStyle = {
  flex: 1,
  gap: spacing.lg,
  padding: spacing.md,
  marginTop: spacing.xs,
  backgroundColor: colors.palette.neutral100,
}

const $daysContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.md,
}

const $dayContainerStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
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

const $frequencyContainer: ViewStyle = {
  flexDirection: "row",
  gap: 4,
}

const $labelStyle: TextStyle = { marginBottom: spacing.xs }

const $labelRequired: TextStyle = {
  color: colors.error,
}

const $reminder: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  padding: spacing.sm,
  borderRadius: spacing.xs,
  marginTop: spacing.xs,
}

const $bottomSheetIcons: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
