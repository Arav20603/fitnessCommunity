import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig'; // Import your Firestore instance

export const fetchUserDataFromFirebase = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);  // Reference to the user document
    const docSnap = await getDoc(userRef); // Fetch the document snapshot

    if (docSnap.exists()) {
      // Document exists, return the data
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.log('Error fetching user data: ', error);
    return null;
  }
};

export const storeUserData = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.log('Error storing user', e);
  }
};

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('user');
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log('Error reading user', e);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.log('Error clearing user', e);
  }
};
