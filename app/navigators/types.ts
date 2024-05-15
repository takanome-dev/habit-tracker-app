import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"

export type HomeStackParamList = {
  Home: undefined
  CreateHabit: undefined
  CreateNewHabit: undefined
  EditHabit: {
    habitId: number
  }
}

export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>
  Statistics: undefined
  Settings: undefined
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "HomeStack">,
  StackScreenProps<HomeStackParamList, T>
>
export type StatisticsScreenProps = BottomTabScreenProps<TabParamList, "Statistics">
export type SettingsScreenProps = BottomTabScreenProps<TabParamList, "Settings">

export type HomeNavProps = HomeStackScreenProps<"Home">["navigation"]
