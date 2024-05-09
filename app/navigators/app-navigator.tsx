/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme, View } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { colors } from "app/theme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Text } from "app/components"
import { HomeStackParamList, TabParamList } from "app/navigators/types"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStack = observer(function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: colors.background }}>
      <Stack.Screen name="Home" component={Screens.HomeScreen} />
      <Stack.Screen name="CreateHabit" component={Screens.CreateHabitScreen} />
      <Stack.Screen name="CreateNewHabit" component={Screens.CreateNewHabitScreen} />
      <Stack.Screen name="EditHabit" component={Screens.EditHabitScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

function StatisticsScreen() {
  return (
    <View style={{}}>
      <Text text="Stats" />
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{}}>
      <Text text="Settings" />
    </View>
  )
}

const Tab = createBottomTabNavigator<TabParamList>()

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof (typeof Ionicons)["glyphMap"]

            if (route.name === "HomeStack") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Statistics") {
              iconName = focused ? "stats-chart" : "stats-chart-outline"
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline"
            }

            // @ts-ignore
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: colors.palette.primary600,
          tabBarInactiveTintColor: colors.palette.neutral600,
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
})
