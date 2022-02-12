import React, { FC } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Header, Text, Screen, GradientBackground } from "../../components";
import { NavigatorParamList } from "../../navigators";
import { color, spacing } from "../../theme";
import PlanList from "../../../src/features/find-plan/infrastructure/ui/plan-list-react";

export const logoIgnite = require("../demo/logo-ignite.png");
export const heart = require("../demo/heart.png");

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
};

const BOLD: TextStyle = { fontWeight: "bold" };

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
};

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
};

const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
};

const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
};

export const FindPlanScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack();

    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="HC FIND PLANS"
            leftIcon="back"
            rightIcon="bullet"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text
            style={TITLE}
            preset="header"
            text="HC Explore what others are planning for today!"
          />
          <Text style={TAGLINE} text="HC Look for a plan that fits you and join them!" />
          <PlanList />
        </Screen>
      </View>
    );
  },
);
