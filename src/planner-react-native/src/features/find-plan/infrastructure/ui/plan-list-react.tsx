import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, FormRow } from "../../../../../app/components";
import { useStores } from "../../../../../app/models";
import { palette } from "../../../../../app/theme/palette";
import { containerDI } from "../../../../core/dependency-injection/container";
import { Category } from "../../../../core/shared/domain/plan";
import { PlanFinder } from "../../application/plan-finder";
import { Section } from "./section";

interface PlanListProps {}

const PlanList = observer((props: PlanListProps) => {
  const { searchPlansStore } = useStores();

  useEffect(() => {
    async function getData() {
      const planFinder = containerDI.resolve(PlanFinder);
      const allPlans = await planFinder.findAll();
      searchPlansStore.savePlans(allPlans);
    }

    getData();
  }, []);

  const findWalkPlans = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const walkPlans = await planFinder.findByCategory(Category.WALK);
    searchPlansStore.savePlans(walkPlans);
  };

  const findRunPlans = async (): Promise<void> => {
    const planFinder = containerDI.resolve(PlanFinder);
    const walkPlans = await planFinder.findByCategory(Category.RUN);
    searchPlansStore.savePlans(walkPlans);
  };

  return (
    <>
      <FormRow preset={"clear"}>
        <Button
          textStyle={{ color: palette.black, fontSize: 18 }}
          text="Walk Plans"
          onPress={findWalkPlans}
        />
      </FormRow>
      <FormRow preset={"clear"}>
        <Button
          textStyle={{ color: palette.black, fontSize: 18 }}
          text="Run Plans"
          onPress={findRunPlans}
        />
      </FormRow>
      <ScrollView>
        {searchPlansStore.plans.map(item => {
          return (
            <Section title={item.title} key={item.id}>
              The plan is a <Text style={styles.highlight}>{item.category}</Text> at{" "}
              <Text style={styles.highlight}>{item.location}</Text> around{" "}
              <Text style={styles.highlight}>{new Date(item.time).toLocaleDateString()}</Text>.
            </Section>
          );
        })}
      </ScrollView>
    </>
  );
});

export default PlanList;

const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
  },
});
