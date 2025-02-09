import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft 
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex h-full items-center justify-between bg-white">
        <LinearGradient
          colors={['rgba(147, 51, 234, 0.1)', 'rgba(255, 255, 255, 0)']}
          className="absolute top-0 w-full h-72"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/sign-up")}
          className="w-full flex justify-end items-end p-5"
        >
          <Text className="text-purple-500 text-md font-outfit-bold">
            Skip
          </Text>
        </TouchableOpacity>

        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-2 h-2 mx-1 bg-slate-200 rounded-full" />
          }
          activeDot={
            <View className="w-8 h-2 mx-1 bg-purple-500 rounded-full">
              <LinearGradient
                colors={['#9333EA', '#7C3AED']}
                className="w-full h-full rounded-full"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          }
          onIndexChanged={(index) => setActiveIndex(index)}
          paginationStyle={{ bottom: 150 }}
        >
          {onboarding.map((item) => (
            <Animated.View 
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(400)}
              key={item.id} 
              className="flex items-center justify-center p-5"
            >
              <View className="bg-purple-50 rounded-full p-8 mb-8">
                <item.image width={width * 0.8} height={280} />
              </View>
              
              <Animated.View 
                entering={SlideInRight.duration(400)}
                exiting={SlideOutLeft.duration(400)}
                className="flex flex-row items-center justify-center w-full mt-10"
              >
                <Text className="text-purple-500 font-outfit-bold text-3xl mx-10 text-center">
                  {item.title}
                </Text>
              </Animated.View>

              <Animated.Text 
                entering={SlideInRight.delay(100).duration(400)}
                exiting={SlideOutLeft.duration(400)}
                className="text-gray-500 text-center text-lg mt-3 mx-10 font-outfit font-semibold"
              >
                {item.description}
              </Animated.Text>
            </Animated.View>
          ))}
        </Swiper>

        <View className="w-full px-6 pb-6 mt-4">
          <CustomButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={() =>
              isLastSlide
                ? router.replace("/(auth)/sign-up")
                : swiperRef.current?.scrollBy(1)
            }
            className={`${isLastSlide ? 'bg-purple-600' : 'bg-purple-500'} 
              shadow-lg shadow-purple-500/30`}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Onboarding;