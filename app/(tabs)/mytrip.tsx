import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "@/components/MyTrips/StartNewTripCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/config/FirebaseConfig";
import UserTripList from "@/components/MyTrips/UserTripList";
import { useRouter } from "expo-router";

const MyTrip = () => {
  const [userTrips, setUserTrips] = useState<any[]>([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user && getMyTrips();
  }, [user]);

  const getMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <ScrollView
      className="p-6 h-full mt-10"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-row items-center justify-between">
        <Text className="text-3xl font-outfit-bold text-purple-700">
          My Trips
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/create-trip/search-place")}
        >
          <Ionicons name="add-circle" size={40} color="#8b5cf6" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#8b5cf6" />}
      {userTrips?.length == 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList userTrips={userTrips} />
      )}
    </ScrollView>
  );
};

export default MyTrip;
