import { Grid } from "@mantine/core";
import React from "react";
import FeatureCard from "~/modules/home/FeatureCard";

const FeaturesSection = () => {
  return (
    <Grid>
      <Grid.Col span="auto">
        <FeatureCard />
      </Grid.Col>

      <Grid.Col span="auto">
        <FeatureCard />
      </Grid.Col>

      <Grid.Col span="auto">
        <FeatureCard />
      </Grid.Col>
    </Grid>
  );
};

export default FeaturesSection;
