import { Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/images";

const RecipeCard = ({ item, idx }) => {
  let isEven = idx % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(idx * 200)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <CachedImage
          uri = { item.strMealThumb }
          style={{
            width: "100%",
            height: idx % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />
        <Text
          style={{ fontSize: hp(2) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 18) + "..." : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;
