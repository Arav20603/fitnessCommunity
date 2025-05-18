import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  const dummyStats = [
    { label: 'Steps', value: 7321 },
    { label: 'Calories', value: 456 },
    { label: 'Workouts', value: 3 },
  ];

  const dummyEvents = [
    { id: 1, name: "Morning Yoga", location: "Park" },
    { id: 2, name: "Evening Run", location: "Track" }
  ];

  const dummyCommunities = [
    { id: 1, name: "Runners Club" },
    { id: 2, name: "Yoga Lovers" }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}> 
        <View>
          <Text style={styles.greeting}>Hey, User 👋</Text>
          <Text style={styles.subtitle}>Ready to crush your goals today?</Text>
        </View>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
      </View>

      {/* Quick Access */}
      <View style={styles.quickActions}>
        <TouchableOpacity onPress={() => router.push('/features/CreateEvent')} style={styles.quickButton}>
          <Text style={styles.quickText}>Create Event</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/features/CreateCommunity')} style={styles.quickButton}>
          <Text style={styles.quickText}>New Community</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsRow}>
          {dummyStats.map((item, index) => (
            <View key={index} style={styles.statBox}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {dummyEvents.map(event => (
          <TouchableOpacity 
            key={event.id} 
            style={styles.card} 
            onPress={() => router.push(`/features/EventDetails?id=${event.id}`)}
          >
            <Text style={styles.cardTitle}>{event.name}</Text>
            <Text style={styles.cardSubtitle}>{event.location}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Communities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Communities</Text>
        {dummyCommunities.map(comm => (
          <View key={comm.id} style={styles.card}>
            <Text style={styles.cardTitle}>{comm.name}</Text>
          </View>
        ))}
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer} className='mb-10'>
        <Text style={styles.sectionTitle}>Nearby Spots</Text>
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.9716,
          longitude: 77.5946,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 12.9716, longitude: 77.5946 }}
          title="Cubbon Park Gym"
          description="Open-air fitness zone"
        />
        <Marker
          coordinate={{ latitude: 12.9756, longitude: 77.5916 }}
          title="Indiranagar Yoga Center"
          description="Morning & evening sessions"
        />
      </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  quickButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 10, flex: 1, marginHorizontal: 6 },
  quickText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  statsCard: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 16, marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 14, color: '#777' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  card: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSubtitle: { fontSize: 14, color: '#666' },
  mapContainer: { height: 250, borderRadius: 12, overflow: 'hidden' },
  map: { width: '100%', height: '100%' },
});

export default Home;
