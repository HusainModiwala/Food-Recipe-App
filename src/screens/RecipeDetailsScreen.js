import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, UsersIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, {FadeIn, FadeInDown} from "react-native-reanimated";

const RecipeDetailsScreen = (props) => {
  const [isFav, setIsFav] = useState(false);
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  let item = props.route.params;
  const mealUrl = "https://themealdb.com/api/json/v1/1/lookup.php?i=";

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      let response = await axios.get(mealUrl + id);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const ingredientsData = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (videoLink) => {
    const regex = /[?&]v=([^&]+)/;
    const match = videoLink.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* recipe image */}
      <View className="items-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(97),
            height: hp(50),
            borderRadius: 35,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          className="mt-5"
          sharedTransitionTag={item.strMeal}
        />
      </View>
      {/* back button */}
      <View  className="w-full absolute flex-row justify-between items-center mt-7">
        <TouchableOpacity
          className="bg-white rounded-full p-2.5 ml-4"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-full p-2.5 mr-4"
          onPress={() => setIsFav(!isFav)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={5}
            color={isFav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* loading */}
      {loading ? (
        <Loading size="large" className="mt-14" />
      ) : (
        <View className="mx-5 justify-between mt-6 space-y-4">
          {/* name & area */}
          <Animated.View entering={FadeInDown.duration(700).springify().damping(10)} className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700 tracking-wider"
            >
              {meal.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-500 tracking-wide"
            >
              {meal.strArea}
            </Text>
          </Animated.View>

          {/* misc */}
          <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(10)} className="flex-row justify-around">
            {/* time */}
            <View className="bg-amber-300 rounded-full p-2">
              <View className="bg-white rounded-full p-1 justify-center items-center">
                <ClockIcon size={hp(4.7)} strokeWidth={2.1} color={"#525252"} />
              </View>
              <View className="items-center my-1.5 space-y-0.5">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold text-neutral-700 tracking-wide"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700 tracking-wider"
                >
                  Mins
                </Text>
              </View>
            </View>

            {/* servings */}
            <View className="bg-amber-300 rounded-full p-2">
              <View className="bg-white rounded-full p-1 justify-center items-center">
                <UsersIcon size={hp(4.7)} color={"#525252"} />
              </View>
              <View className="items-center my-1.5 space-y-0.1">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold text-neutral-700 tracking-wide"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(2.1) }}
                  className="font-bold text-neutral-700 tracking-wider"
                >
                  Serv
                </Text>
                <Text
                  style={{ fontSize: hp(2.1) }}
                  className="font-bold text-neutral-700 tracking-wider"
                >
                  ings
                </Text>
              </View>
            </View>

            {/* cal */}
            <View className="bg-amber-300 rounded-full p-2">
              <View className="bg-white rounded-full p-1 justify-center items-center">
                <FireIcon size={hp(4.7)} strokeWidth={2.1} color={"#525252"} />
              </View>
              <View className="items-center my-1.5 space-y-0.5">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold text-neutral-700 tracking-wide"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700 tracking-wider"
                >
                  cal
                </Text>
              </View>
            </View>

            {/* difficulty */}
            <View className="bg-amber-300 rounded-full p-2">
              <View className="bg-white rounded-full p-1 justify-center items-center">
                <Square3Stack3DIcon
                  size={hp(4.7)}
                  strokeWidth={2.1}
                  color={"#525252"}
                />
              </View>
              <View className="items-center my-1.5 space-y-0.5">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold text-neutral-700 tracking-wide"
                ></Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700 tracking-wider"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(10)} className="space-y-4">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700 tracking-wider"
            >
              Ingredients
            </Text>
            <View className="space-y-3 ml-3">
              {ingredientsData(meal).map((i) => (
                <View key={i} className="flex-row space-x-4">
                  <View
                    style={{ height: hp(2), width: hp(2) }}
                    className="bg-amber-300 rounded-full"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="font-extrabold text-neutral-700 tracking-wide"
                    >
                      {meal["strMeasure" + i]}
                    </Text>
                    <Text
                      style={{ fontSize: hp(2) }}
                      className="font-extrabold text-neutral-500 tracking-wider"
                    >
                      {meal["strIngredient" + i]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(10)} className="space-y-4">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700 tracking-wider"
            >
              Instructions
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-neutral-700 tracking-wide"
            >
              {meal.strInstructions}
            </Text>
          </Animated.View>

          {/* youtube video */}
          {meal.strYoutube && (
            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(10)} className="space-y-3">
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold text-neutral-700 tracking-wider"
              >
                Recipe Video
              </Text>
              <View className="p-1">
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;
