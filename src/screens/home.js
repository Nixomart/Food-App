import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Search from "react-native-vector-icons/Feather";
import { TextInput } from "react-native";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function Home() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [recipes, setRecipes] = useState([])
  useEffect(()=>{
getCategories()
getRecipeByCategory()
  },[])
  const getCategories = async() =>{
    try {
      const response =await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      /* console.log(response.data.categories); */
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log("#########error fetching data: ", error);
    }
  }
  const getRecipeByCategory = async(category = 'Beef') =>{
    try {
      const response =await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      /* console.log("############################################################### ", response.data); */
      if (response && response.data) {
        setRecipes(response.data.meals)
      }
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  }
  return (
    <View className="flex-1  bg-white">
      <StatusBar style="dark" />
      <ScrollView className="space-y-6 pt-14">
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../assets/avatar.png")}
          />
          {/* <CiBellOn /> */}
          <Icon name="bells" size={30} />
        </View>
        {/* GREETING AND PUNCHLINE */}
        <View className="mx-4 space-y-2">
          <Text>Hola, Nico!</Text>
          <View>
            <Text className="text-4xl">Make your own food, </Text>
          </View>
          <View>
            <Text className="text-4xl">
              stay at <Text className="text-4xl text-amber-500">home</Text>
            </Text>
          </View>
        </View>
        {/* search bar */}
        <View className='mx-4 bg-gray-100 flex-row justify-between rounded-full p-[6px]'>
          <TextInput placeholder="Search"  className='pl-4 tracking-wider'/>
          <View className='bg-white p-1 shadow-lg rounded-full'>
            <Search name="search"  size={30}/>
          </View>
        </View>
        {/* categories */}
        <View>
        { categories.length > 0 && <Categories getRecipeByCategory={getRecipeByCategory} categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}

        </View>
        {/* recipes */}
        <View>
          <Recipes recipes={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
