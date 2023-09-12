import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {FadeInDown} from "react-native-reanimated";


const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(650).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((item) => {
          const isActive = item.strCategory === activeCategory;
          const activeCategoryClass = isActive
            ? " bg-amber-400"
            : "bg-black/10";
          return (
            <TouchableOpacity
              key={item.idCategory}
              className="flex items-center space-y-1"
              onPress={() => setActiveCategory(item.strCategory)}
            >
              <View className={"rounded-full p-2.5 " + activeCategoryClass}>
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={{ height: hp(9), width: hp(9) }}
                  className="rounded-full"
                />
              </View>
              <Text style={{ fontSize: hp(1.8) }} className="text-neutral-600">
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
