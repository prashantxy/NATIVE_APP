import { View, Text, TouchableOpacity, Image } from "react-native"; 
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/config/FirebaseConfig";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/(auth)/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-outfit-bold mb-8">Profile</Text>

      {/* User Info Section */}
      <View className="bg-purple-50 p-6 rounded-xl mb-8">
        <View className="flex-row items-center mb-4">
          <View className="bg-purple-200 p-4 rounded-full">
            <Ionicons name="person" size={32} color="#8b5cf6" />
          </View>
          <View className="ml-4">
            <Text className="text-xl font-outfit-bold">{user?.email}</Text>
            <Text className="text-gray-600 font-outfit">
              Member since{" "}
              {new Date(user?.metadata.creationTime!).getFullYear()}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Settings Section */}
      <View className="mb-8">
        <Text className="text-xl font-outfit-bold mb-4">Account Settings</Text>
        <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl mb-3">
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={24} color="#8b5cf6" />
            <Text className="ml-3 font-outfit">Email</Text>
          </View>
          <Text className="text-gray-500 font-outfit">{user?.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={24} color="#8b5cf6" />
            <Text className="ml-3 font-outfit">Last Sign In</Text>
          </View>
          <Text className="text-gray-500 font-outfit">
            {new Date(user?.metadata.lastSignInTime!).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <CustomButton
        title="Logout"
        onPress={handleLogout}
        bgVariant="outline"
        textVariant="primary"
      />
    </SafeAreaView>
  );
};

export default Profile;
