import { NativeWindStyleSheet } from "nativewind";
import { useState } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Auth(props: { setAuthenticated: any }) {
  const [authMode, setAuthMode] = useState("login");
  const [accountType, setAccountType] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const accounts = [
    { type: "Consumer", image: require("../../assets/consumer.png") },
    { type: "Retailer", image: require("../../assets/retailer.png") },
    { type: "Admin", image: require("../../assets/admin.png") },
  ];

  return (
    <View className="p-6 pt-8 text-3xl text-red">
      <Text className="text-3xl font-bold">Track Go</Text>
      <Text>Sign up or Login to your account</Text>
      <View className="flex flex-row items-center justify-center pt-6">
        <TouchableOpacity
          className={`rounded-lg flex flex-row content-center items-center w-full justify-center ${
            authMode === "login" ? "bg-blue-500 text-white" : "text-blue-500"
          } p-2 w-1/2`}
          onPress={() => setAuthMode("login")}
        >
          <Text
            className={`${
              authMode === "login" ? "text-white" : "text-blue-600"
            }`}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`rounded-lg flex flex-row content-center items-center w-full justify-center ${
            authMode === "signup" ? "bg-blue-500 text-white" : "text-blue-500"
          } p-2 w-1/2`}
          onPress={() => setAuthMode("signup")}
        >
          <Text
            className={`${
              authMode === "signup" ? "text-white" : "text-blue-600"
            }`}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View className="pt-6">
        <Text>Choose account type</Text>
        <View className="flex flex-row gap-2 justify-between">
          {accounts.map((account, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setAccountType(account.type)}
                className={`${
                  accountType === account.type && accountType !== ""
                    ? "border-2 border-black"
                    : ""
                } bg-gray-200 w-1/3 flex flex-col items-center rounded-xl p-2`}
              >
                <Text className="text-gray-700">{account.type}</Text>
                <Image source={account.image} />
              </TouchableOpacity>
            );
          })}
          {/* <TouchableOpacity
            onPress={() => setAccountType("consumer")}
            className={`${
              accountType === "consumer" ? "border-2 border-black" : ""
            } bg-gray-200 w-1/3 flex flex-col items-center rounded-xl p-2`}
          >
            <Text className="text-gray-700">Customer</Text>
            <Image source={require("../../assets/consumer.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAccountType("retailer")}
            className="bg-gray-200 w-1/3 flex flex-col items-center rounded-xl p-2"
          >
            <Text className="text-gray-700">Retailer</Text>
            <Image source={require("../../assets/retailer.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAccountType("admin")}
            className="bg-gray-200 w-1/3 flex flex-col items-center rounded-xl p-2"
          >
            <Text className="text-gray-700">Admin</Text>
            <Image source={require("../../assets/admin.png")} />
          </TouchableOpacity> */}
        </View>
      </View>

      {authMode === "login" ? (
        <View>
          <View className="flex flex-col gap-2 pt-6">
            <View>
              <Text>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                className="border-2 border-black p-2 rounded-lg"
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                className="border-2 border-black p-2 rounded-lg"
              />
            </View>
            <Text className="justify-end text-gray-500">Forgot Password?</Text>
          </View>

          <View className="flex flex-col gap-2 justify-center items-center mt-8">
            <Text className="text-gray-500">Login with ease using</Text>
            <View className="rounded-xl flex flex-row justify-center content-center items-center gap-2 p-1 w-full border-2 border-gray-300">
              <Image source={require("../../assets/google.png")} />
              <Text>Google</Text>
            </View>
            <View className="rounded-xl p-3 flex flex-col items-center bg-blue-500 w-full">
              <Text className="text-white">Login</Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View className="flex flex-col gap-2 pt-6">
            <View>
              <Text>Full Name</Text>
              <TextInput
                value={name}
                onChangeText={(e) => setName(e)}
                placeholder="Enter your Name"
                className="border-2 border-black p-2 rounded-lg"
              />
            </View>
            <View>
              <Text>Email Address</Text>
              <TextInput
                value={newEmail}
                onChangeText={(e) => setNewEmail(e)}
                placeholder="Enter your Email"
                className="border-2 border-black p-2 rounded-lg"
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                value={newPassword}
                onChangeText={(e) => setNewPassword(e)}
                placeholder="Enter your Password"
                className="border-2 border-black p-2 rounded-lg"
              />
            </View>
          </View>

          <View className="flex flex-col gap-2 justify-center items-center mt-8">
            <View className="rounded-xl p-3 bg-blue-500 flex flex-col items-center w-full justify-center">
              <Text className="text-white">SignUp</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

NativeWindStyleSheet.create({
  styles: {
    "text-primary": {
      color: "#00f",
    },
    "bg-gray": {
      backgroundColor: "#808080",
    },
  },
});
