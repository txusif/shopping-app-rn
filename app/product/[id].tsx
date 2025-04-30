import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
