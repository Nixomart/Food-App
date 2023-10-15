import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Heart from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
export default function RecipeDetailScreen(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  let item = props.route.params;
  console.log(item);
  useEffect(() => {
    getRecipeByCategory(item.idMeal);
  }, []);
  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };
  const getRecipeByCategory = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      console.log(
        "############################################################### ",
        response.data.meals[0]
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(true);
      }
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };
  const getYoutubeVideoId = url=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
}
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        className="bg-white flex-1"
        style={{ borderWidth: 3, margin: 2 }}
      >
        <StatusBar style="light" />
        <View className="flex- mx-1 justify-center">
          <Image
            source={{ uri: item.strMealThumb }}
            style={{
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              marginTop: 4,
            }}
            className="bg-black/5 w-full h-96"
          />
        </View>
        <Text className="text-2xl text-center font-semibold">
          {item.strMeal}
        </Text>
        {/* BUTTONS */}
        <View className="absolute flex-row justify-between w-full top-10 px-4 ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white p-2 rounded-full"
          >
            <Icon name="arrow-left" size={50} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="bg-white rounded-full p-2"
          >
            {isFavorite ? (
              <Heart name="heart" size={40} />
            ) : (
              <Heart name="heart-outline" size={40} />
            )}
          </TouchableOpacity>
        </View>
        {!loading ? (
          <View>
            <Icon
              size={50}
              name="spinner-3"
              className="flex-1 animate-spin text-4xl"
            />
          </View>
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* name and area */}
            {/*  <View className="space-y-2">
              <Text className="font-bold flex-1 text-neutral-700">
                {meal?.strMeal}
              </Text>
              <Text className="font-medium flex-1 text-neutral-500">
                {meal?.strArea}
              </Text>
            </View> */}
            {/* misc */}
            <View className="flex-row justify-around">
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: 50, width: 50 }}
                  className="bg-white rounded-full flex items-center  justify-center"
                >
                  <Icon size={50} name={"clock"} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: 20 }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: 15 }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: 50, width: 50 }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  {/* <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: 20 }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: 15 }}
                    className="font-bold text-neutral-700"
                  >
                    Servings
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: 50, width: 50 }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  {/* <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: 20 }}
                    className="font-bold text-neutral-700"
                  >
                    103
                  </Text>
                  <Text
                    style={{ fontSize: 15 }}
                    className="font-bold text-neutral-700"
                  >
                    Cal
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: 50, width: 50 }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  {/*                             <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" /> */}
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: 20 }}
                    className="font-bold text-neutral-700"
                  ></Text>
                  <Text
                    style={{ fontSize: 15 }}
                    className="font-bold text-neutral-700"
                  >
                    Easy
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="text-xl font-normal">Ingredients</Text>
              <View>
                {ingredientsIndexes(meal).map((i) => {
                  return (
                    <View key={i} className="flex-row space-y-2 space-x-4">
                      <View
                        style={{ height: 15, width: 15 }}
                        className="bg-amber-300 my-auto rounded-full"
                      />
                      <View className="flex-row space-x-2">
                        <Text
                          style={{ fontSize: 20 }}
                          className="font-extrabold text-neutral-700"
                        >
                          {meal["strMeasure" + i]}
                        </Text>
                        <Text
                          style={{ fontSize: 20 }}
                          className="font-medium text-neutral-600"
                        >
                          {meal["strIngredient" + i]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <View className="space-y-4">
                    <Text style={{fontSize: 20}} className="font-bold flex-1 text-neutral-700">
                        Instructions
                    </Text>
                    <Text style={{fontSize: 15}} className="text-neutral-700">
                        {
                            meal?.strInstructions
                        }
                    </Text>
                </View>
                {
                    meal.strYoutube && (
                        <View className="space-y-4">
                            <Text style={{fontSize: 20}} className="font-bold flex-1 text-neutral-700">
                                Recipe Video
                            </Text>
                            <View>
                                <YoutubeIframe
                                    videoId={getYoutubeVideoId(meal.strYoutube)}
                                    height={220}
                                />
                            </View>
                        </View>
                    )
                }
          </View>
        )}
      </ScrollView>
    </>
  );
}
