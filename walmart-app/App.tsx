import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Auth from "./screens/Auth/Auth";

export default function App() {
  return (
    <View className="text-5xl text-blue-600 p-2">
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <Auth />
      <StatusBar style="auto" />
    </View>
  );
}
