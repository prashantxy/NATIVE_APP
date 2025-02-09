import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { router } from "expo-router";

const DummyLogin = () => {
  const handleDummyLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "testuser@gmail.com",
        "testuser123"
      );

      // Successfully signed in
      const user = userCredential.user;
      console.log("Logged in with dummy account:", user.email);

      // Navigate to the main app
      router.replace("/(tabs)/mytrip");
    } catch (error: any) {
      console.error("Error signing in with dummy account:", error);
      alert("Error signing in with dummy account. Please try again.");
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-neutral-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-neutral-100" />
      </View>

      <CustomButton
        title="Use Dummy Account"
        className="mt-5 w-full"
        bgVariant="outline"
        textVariant="primary"
        onPress={handleDummyLogin}
      />
    </View>
  );
};

export default DummyLogin;
