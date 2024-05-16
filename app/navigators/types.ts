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

export type SettingsStackParamList = {
  Settings: undefined
  PersonalInfos: undefined
  Notifications: undefined
  Security: undefined
  EditPassword: undefined
  Language: undefined
  AboutUs: undefined
  Rating: undefined
  Support: undefined
  EditPersonalInfos: undefined
}

export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>
  Statistics: undefined
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>
}

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "HomeStack">,
  StackScreenProps<HomeStackParamList, T>
>
export type StatisticsScreenProps = BottomTabScreenProps<TabParamList, "Statistics">

export type SettingsScreenProps<T extends keyof SettingsStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "SettingsStack">,
  StackScreenProps<SettingsStackParamList, T>
>
export type HomeNavProps = HomeStackScreenProps<"Home">["navigation"]
