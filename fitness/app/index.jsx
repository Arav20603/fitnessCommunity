import { Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getUserData } from './services/Storage'; // Ensure this function is async and returns the user data
import './global.css'
import { images } from '@/constants/images'; // Import images for landing page

const Index = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const userData = await getUserData();
      setUser(userData);

      if (userData) {
        router.replace('/(tabs)/Home');
      } else {
        router.replace('/login/signin');
      }
    };

    checkUser(); // Run the check when component mounts
  }, [router]);

  if (user === null) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return (
      <View>
        <View className="flex">
          <Image source={images.fit} className="w-full h-[870px]" />
        </View>
        <View className="absolute bg-[#191970] top-[640px] h-full w-full flex items-center opacity-70">
          <Text className="mt-8 text-3xl font-semibold text-white">
            Track your Fitness Journey
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/login/signin')}
            className="mt-10 bg-[#FFFAFA] p-3 w-[150px] rounded-2xl"
          >
            <Text className="text-[#191970] font-bold text-lg text-center">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null; // This is never shown since we redirect earlier.
};

export default Index;
