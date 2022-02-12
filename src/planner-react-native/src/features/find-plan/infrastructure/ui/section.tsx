import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette } from "../../../../../app/theme/palette";

interface Props {
  title: string;
}

export const Section = ({ children, title }: PropsWithChildren<Props>) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: palette.white }]}>{title}</Text>
      <Text style={[styles.sectionDescription, { color: palette.offWhite }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
