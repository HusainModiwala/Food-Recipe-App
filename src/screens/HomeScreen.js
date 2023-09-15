import { View, Image, ScrollView, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import axios from "axios";

const HomeScreen = () => {
  const categoryUrl = "https://themealdb.com/api/json/v1/1/categories.php";
  const recipeUrl = "https://themealdb.com/api/json/v1/1/filter.php?c=";

  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const getCategories = async () => {
    try {
      let response = await axios.get(categoryUrl);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const getRecipes = async (category="Beef") => {
    try {
      let response = await axios.get(recipeUrl+category);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleChange = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    // setMeals([])
  }

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6 pt-14"
      >
        {/* avatar and bellicon */}
        <View className="flex-row justify-between items-center mx-4 mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ width: hp(6.5), height: hp(6) }}
          />
          <BellIcon size={hp(5)} color={"grey"} />
        </View>

        {/* greetings and punch line */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.8) }} className="text-neutral-600">
            Hello Husain
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.9) }}
              className="font-semibold text-neutral-600"
            >
              Make you own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.9) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar & icon */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-2.5">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="grey"
            style={{ fontSize: hp(1.9) }}
            className="flex-1 pl-3 mb-1 tracking-wider"
          />
          <View className="bg-white rounded-full p-2.5">
            <MagnifyingGlassIcon
              size={hp(2.6)}
              strokeWidth={3}
              color={"grey"}
            />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChange={handleChange}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
        <View></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
