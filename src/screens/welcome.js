import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
export default function Welcome() {
  
  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)
  const navigation = useNavigation()
  useEffect(()=>{
    ring1padding.value = 0
    ring2padding.value = 0
    setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + (30))
    }, 100);
    setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + (25))
    }, 300);
    setTimeout(() => {
      navigation.navigate('Home')      
    }, 2500);
  })
  return (
    <View className="flex-1 bg-amber-500 justify-center items-center flex">
      <StatusBar style="light" />
      {/* logo */}

      <Animated.View   style={{padding: ring1padding}} className="bg-white/20 rounded-full ">
        <Animated.View style={{padding: ring2padding}} className="bg-white/20 rounded-full">
          <Image 
          style={{width: 200, height: 200}}
          source={require("../../assets/welcome.png"
          )} />
        </Animated.View>
      </Animated.View>
      {/* tile */}

      <View className='flex items-center space-y-2'>
        <Text className='font-bold text-white tracking-widest text-6xl'>
          Foody
        </Text>
        <Text className='font-medium text-white tracking-widest text-lg'>
          Food is always right
        </Text>

      </View>
    </View>
  );
}
