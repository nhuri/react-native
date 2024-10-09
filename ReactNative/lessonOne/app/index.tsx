import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link
        style={{ fontSize: 20, textAlign: "center", marginVertical: 20 }}
        href={"/dashboard"}
      >
        link to Dashboard page
      </Link>
    </View>
  );
};

export default index;
