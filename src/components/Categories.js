import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
/* import { categoryData } from "../constants"; */
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";
export default function Categories({
  activeCategory,
  setActiveCategory,
  categories,
  getRecipeByCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="space-x-6"
        horizontal
      >
        {categories.map((item, index) => {
          let isActive = item.strCategory === activeCategory;
          let activeButton = isActive ? "bg-amber-400" : "bg-gray-200";
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveCategory(item.strCategory),
                  getRecipeByCategory(item.strCategory);
              }}
              className="flex  items-center space-y-2"
              key={index}
            >
              <View className={`rounded-full  p-[9px]` + activeButton}>
                <CachedImage
                  uri={item.strCategoryThumb}
                  style={{ width: 50, height: 50 }}
                  className="rounded-full"
                />
                {/* <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={{ width: 50, height: 50 }}
                /> */}
              </View>
              <Text>{item.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
