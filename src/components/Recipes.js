import { View, Text } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { Pressable } from "react-native";
import { Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Spinner from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
export default function Recipes({ categories, recipes }) {
  const navigation = useNavigation()
  /* console.log("RECIPES DESDE EL COMP: ", recipes[1]); */
  return (
    <View>
      <Text className="font-normal text-3xl my-2">Recipes</Text>
      <View>
        {categories.length === 0 || recipes.length === 0 ? (
          <Spinner size={50} name="animate-spin" icon={'spinner-3'}/>
        ) : (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
            /* refreshing={isLoadingNext} */
            /* onRefresh={() => refetch({ first: ITEM_CNT })} */
            onEndReachedThreshold={0.1}
            /* onEndReached={() => loadNext(ITEM_CNT)} */
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index & (2 == 0);
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
      onPress={()=> navigation.navigate('RecipeDetail', {...item})}
        className="flex justify-center mb-4 space-y-1"
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
      >
        {/* <CachedImage
          uri={item.strMealThumb}
          className="bg-black/5 rounded-3xl"
          style={{ width: "100%", height: index % 3 == 0 ? 300 : 350 }}
        /> */}
         <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: "100%", height: index % 3 == 0 ? 300 : 350 }}
          className="bg-black/5 rounded-3xl"
        />
        <Text className="font-semibold ml-2">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
