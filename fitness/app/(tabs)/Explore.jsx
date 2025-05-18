import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';

const Explore = () => {
  const router = useRouter();

  const navigateTo = (section) => {
    // Replace this with actual navigation to the respective screen
    router.push(`/features/${section}`);
  };

  return (
    // <View>
      <ScrollView className="flex bg-gray-100 py-6 px-4">
      <Text className="text-3xl font-bold text-center text-blue-700 mb-5">Explore Fitness</Text>

      <View className="grid grid-cols-2 gap-6">
        {/* Communities Card */}
        <TouchableOpacity
          onPress={() => navigateTo('CommunitiesList')}
          className="bg-blue-500 rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            source={ images.community } // Your image for Communities
            className="w-full h-40 object-cover"
          />
          <View className="p-4">
            <Text className="text-xl font-semibold text-white">Communities</Text>
            <Text className="text-white mt-2">Join or create fitness communities</Text>
          </View>
        </TouchableOpacity>

        {/* Events Card */}
        <TouchableOpacity
          onPress={() => navigateTo('EventsList')}
          className="bg-green-500 rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            source={images.event} // Your image for Events
            className="w-full h-40 object-cover"
          />
          <View className="p-4">
            <Text className="text-xl font-semibold text-white">Events</Text>
            <Text className="text-white mt-2">Find local and virtual fitness events</Text>
          </View>
        </TouchableOpacity>

        {/* Personalized Workouts Card */}
        <TouchableOpacity
          onPress={() => navigateTo('Personalized')}
          className="bg-purple-500 rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            source={images.personalized} // Your image for Workouts
            className="w-full h-40 object-cover"
          />
          <View className="p-4">
            <Text className="text-xl font-semibold text-white">Personalized Workouts</Text>
            <Text className="text-white mt-2">Get a workout routine tailored to you</Text>
          </View>
        </TouchableOpacity>

        {/* Don't Know What to Do Card */}
        <TouchableOpacity
          onPress={() => navigateTo('DontKnow')}
          className="bg-yellow-500 rounded-lg shadow-lg overflow-hidden mb-[50px]"
        >
          <Image
            source={images.dontknow} // Your image for Random
            className="w-full h-40 object-cover"
          />
          <View className="p-4">
            <Text className="text-xl font-semibold text-white">Don't Know What to Do?</Text>
            <Text className="text-white mt-2">Let us suggest a random activity!</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    // </View>
  );
};

export default Explore;
