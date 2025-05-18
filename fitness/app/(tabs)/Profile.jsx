import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../config/FirebaseConfig';
import { images } from '@/constants/images';
import { fetchUserDataFromFirebase } from '../services/Storage';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const data = await fetchUserDataFromFirebase(userId);
      setUserData(data);
    }
    setLoading(false);
  };

  const logout = async () => {
    await signOut(auth);
    router.replace('/login/signin');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={userData?.photoURL ? { uri: userData.photoURL } : images.defaultAvatar}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData?.name || 'No Name'}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
        <Text style={styles.tapText}>Tap to update your photo</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Your Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>🎯 Fitness Goals:</Text>
          <Text style={styles.value}>{userData?.goals || 'Not set'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>📆 Habits:</Text>
          <Text style={styles.value}>{userData?.habits || 'Not set'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>⚽ Sports Interests:</Text>
          <Text style={styles.value}>{userData?.sportsInterest || 'Not set'}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f9ff',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#e0f0ff',
    padding: 24,
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#1E90FF',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E2A38',
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  tapText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    padding: 20,
    marginTop: 10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E90FF',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 15,
    color: '#4b5563',
    marginTop: 4,
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#ff4d4f',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
