import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import DummyLogin from "@/components/DummyLogin";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onLoginPress = async () => {
    try {
      if (!form.email || !form.password) {
        alert("Please fill in all fields");
        return;
      }

      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Successfully signed in
      const user = userCredential.user;
      console.log(user);

      // Navigate to the main app
      router.replace("/(tabs)/mytrip");
    } catch (error: any) {
      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email address");
          break;
        case "auth/user-disabled":
          alert("This account has been disabled");
          break;
        case "auth/user-not-found":
          alert("No account found with this email");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        default:
          alert("Error signing in: " + error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          {/* Header Section */}
          <View className="relative w-full h-96">
            <Image
              source={require("@/assets/images/avent-sign.jpg")}
              className="absolute w-full h-96"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              className="absolute bottom-0 w-full h-1/2"
            />
            <BlurView
              intensity={80}
              className="absolute bottom-0 w-full py-6 px-5"
            >
              <Animated.Text 
                entering={FadeInDown.duration(800)}
                className="text-4xl font-outfit-bold text-white"
              >
                Welcome Back
              </Animated.Text>
              <Text className="text-gray-200 font-outfit-medium mt-2">
                Sign in to continue your journey
              </Text>
            </BlurView>
          </View>

          {/* Form Section */}
          <View className="p-5 -mt-6 bg-white rounded-t-3xl">
            <Animated.View 
              entering={FadeInDown.duration(600).delay(300)}
              className="space-y-4"
            >
              <InputField
                label="Email"
                placeholder="Enter your email address"
                icon={icons.email}
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
                containerStyle="bg-gray-50 border-gray-100"
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={icons.lock}
                secureTextEntry={true}
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                containerStyle="bg-gray-50 border-gray-100"
              />
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.duration(600).delay(600)}
              className="mt-6"
            >
              <CustomButton
                title={isLoading ? "Logging In..." : "Log In"}
                onPress={onLoginPress}
                className="bg-purple-500 shadow-lg shadow-purple-500/30"
                disabled={isLoading}
              />

              <DummyLogin />

              <View className="flex-row justify-center items-center mt-8 space-x-1">
                <Text className="text-gray-600 font-outfit-medium">
                  New to Travel intelligence guide?
                </Text>
                <Link href="/(auth)/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="text-purple-500 font-outfit-bold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;