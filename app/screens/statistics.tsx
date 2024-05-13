import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { BarChart, barDataItem, PieChart, pieDataItem } from "react-native-gifted-charts"

import { Text, Screen } from "app/components"
import layout from "app/utils/layout"

import { colors, spacing } from "../theme"
import { StatisticsScreenProps } from "app/navigators/types"

const filters = [
  { title: "Day", abbr: "D", id: 1 },
  { title: "Week", abbr: "W", id: 2 },
  { title: "Month", abbr: "M", id: 3 },
  { title: "Three Months", abbr: "3M", id: 4 },
  { title: "Six Months", abbr: "6M", id: 5 },
  { title: "Year", abbr: "Y", id: 6 },
]

export const StatisticsScreen: FC<StatisticsScreenProps> = observer(function StatisticsScreen() {
  const [filter, setFilter] = React.useState("D")

  const data: barDataItem[] = [
    {
      value: 200,
      frontColor: colors.palette.primary600,
      gradientColor: colors.palette.primary100,
      label: "S",
    },
    {
      value: 450,
      frontColor: colors.palette.primary600,
      gradientColor: colors.palette.primary100,
      label: "M",
    },
    {
      value: 600,
      frontColor: colors.palette.primary600,
      gradientColor: colors.palette.primary100,
      label: "T",
    },
    {
      value: 990,
      frontColor: colors.palette.primary600,
      gradientColor: colors.palette.primary100,
      label: "W",
    },
    {
      value: 820,
      frontColor: colors.palette.primary600,
      gradientColor: colors.palette.primary100,
      label: "T",
    },
    {
      value: 480,
      frontColor: colors.palette.primary600,
      gradientColor: colors.palette.primary100,
      label: "F",
    },
    {
      value: 1000,
      frontColor: colors.palette.primary600,
      // gradientColor: colors.palette.primary100,
      label: "S",
    },
  ]

  const pieData: pieDataItem[] = [
    {
      value: 80,
      color: colors.palette.secondary500,
      focused: true,
    },
    { value: 20, color: colors.palette.accent500 },
  ]

  const barData = [
    {
      value: 40,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 20, frontColor: "#ED6665" },
    {
      value: 50,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 75,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 25, frontColor: "#ED6665" },
    {
      value: 30,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 20, frontColor: "#ED6665" },
    {
      value: 60,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 40, frontColor: "#ED6665" },
    {
      value: 65,
      label: "Jun",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#177AD5",
    },
    { value: 30, frontColor: "#ED6665" },
  ]

  const renderTitle = () => {
    return (
      <View style={{ gap: spacing.lg, marginVertical: spacing.xl }}>
        <Text text="Habits Comparisons" preset="formLabel" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#177AD5",
              }}
            />
            <Text
              style={{
                color: colors.palette.neutral600,
              }}
            >
              Current month
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#ED6665",
              }}
            />
            <Text
              style={{
                color: colors.palette.neutral600,
              }}
            >
              Last month
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const renderDot = (color: string) => {
    return <View style={[$dotStyle, { backgroundColor: color }]} />
  }

  const renderLegendComponent = () => {
    return (
      <View style={$legendContainer}>
        <View style={$legend}>
          {renderDot(colors.palette.secondary500)}
          <Text style={{}}>Excellent: 80%</Text>
        </View>
        <View style={$legend}>
          {renderDot(colors.palette.accent500)}
          <Text style={{}}>Okay: 20%</Text>
        </View>
      </View>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$container}>
      <View style={$topContainer}>
        <Text text="Stats" preset="heading" />
        <MaterialCommunityIcons name="export-variant" size={24} />
      </View>
      <View style={$filtersContainer}>
        {filters.map((f, idx) => (
          <>
            <TouchableOpacity
              key={`${f.id}-${f.abbr}`}
              style={filter === f.abbr ? $activeFilter : {}}
              onPress={() => setFilter(f.abbr)}
            >
              <Text text={f.abbr} preset="bold" style={filter === f.abbr ? $activeText : {}} />
            </TouchableOpacity>
            {filters.length > idx + 1 && (
              <Text key={`${f.id}-${f.abbr}-${idx}`} text="•" preset="bold" />
            )}
          </>
        ))}
      </View>
      <View>
        <View style={$barChartOverviewContainer}>
          <Text text="Total Activities" preset="formLabel" />
          <Text text="87%" preset="heading" />
        </View>
        <View style={$barChartContainer}>
          <BarChart
            data={data}
            barWidth={20}
            width={layout.window.width * 0.77}
            height={layout.window.height * 0.3}
            initialSpacing={spacing.xs}
            spacing={spacing.lg}
            barBorderRadius={spacing.sm}
            yAxisThickness={0}
            noOfSections={5}
            xAxisType={"dashed"}
            xAxisColor={colors.palette.neutral400}
            yAxisTextStyle={{ color: colors.textDim }}
            stepValue={100}
            maxValue={1000}
            yAxisLabelTexts={["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]}
            xAxisLabelTextStyle={$xAxisLabelText}
            yAxisLabelSuffix="%"
            showLine
            // hideYAxisText
            // hideRules
            lineConfig={{
              color: colors.palette.accent500,
              thickness: 3,
              curved: true,
              hideDataPoints: true,
              shiftY: 20,
            }}
          />
        </View>
      </View>

      <View style={{ gap: spacing.xl, marginTop: spacing.md }}>
        <Text text="Daily Habits Overview" preset="formLabel" />
        <View style={$pieChartContainer}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={colors.palette.secondary500}
            centerLabelComponent={() => {
              return (
                <View style={$pieChartLabelContainer}>
                  <Text
                    text="80%"
                    preset="subheading"
                    style={{ color: colors.palette.neutral100 }}
                  />
                  <Text
                    text="Excellent"
                    preset="formLabel"
                    style={{ color: colors.palette.neutral100 }}
                  />
                </View>
              )
            }}
          />
          <View>{renderLegendComponent()}</View>
        </View>
      </View>

      <View style={{}}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: colors.textDim }}
          noOfSections={3}
          maxValue={75}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
  gap: spacing.xl,
  paddingBottom: 70,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $xAxisLabelText: TextStyle = {
  color: colors.textDim,
  textAlign: "center",
}

const $barChartContainer: ViewStyle = {
  overflow: "hidden",
}

const $barChartOverviewContainer: ViewStyle = {
  marginBottom: spacing.xs,
}

const $filtersContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.sm,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $activeFilter: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  borderRadius: 99,
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "center",
}

const $activeText: TextStyle = {
  color: colors.palette.neutral100,
  textAlign: "center",
}

const $dotStyle: ViewStyle = {
  height: 10,
  width: 10,
  borderRadius: 5,
  marginRight: 10,
}

const $legendContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 10,
}

const $legend: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
}

const $pieChartContainer: ViewStyle = {
  alignItems: "center",
  width: "100%",
  gap: spacing.md,
}

const $pieChartLabelContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}
