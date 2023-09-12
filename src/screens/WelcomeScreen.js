import { View, Image, Text } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1_padding = useSharedValue(0);
  const ring2_padding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1_padding.value = 0;
    ring2_padding.value = 0;
    setTimeout(() => ring1_padding.value = withSpring(hp(5)), 100);
    setTimeout(() => ring2_padding.value = withSpring(hp(5.5)), 350);
    setTimeout(() => navigation.navigate('Home'), 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo */}
      <Animated.View
        style={{ padding: ring2_padding }}
        className="bg-white/20 rounded-full"
      >
        <Animated.View
          style={{ padding: ring1_padding }}
          className="bg-white/20 rounded-full"
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold text-white tracking-widest"
        >
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest"
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
