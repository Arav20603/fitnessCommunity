import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { db } from '../config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = [];
      querySnapshot.forEach(doc => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsList);
      setLoading(false);
    } catch (error) {
      alert('Error fetching events: ' + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleViewEvent = (eventId) => {
    // Navigate to the EventDetail page with the eventId
    router.push(`/features/${eventId}`);
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View className='flex flex-row justify-between items-center'>
        <Text className='text-2xl font-bold'>Event List</Text>
        <TouchableOpacity onPress={() => router.push('/features/CreateEvent')} style={styles.createButton} className='relative mr-4'>
              <Text style={styles.buttonText} className='text-4xl text-center'>+</Text>
        </TouchableOpacity>
      </View>

      {events.length === 0 ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>No events available yet.</Text>
        </View>
      ) : (
        events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.description}>{event.description}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  loadingText: { fontSize: 18, textAlign: 'center' },
  noEventsContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  noEventsText: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  viewButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  createButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, marginTop: 10, width: 60, marginBottom: 20,
    fontWeight: 600,
   },
  eventCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#555', marginBottom: 10 },
  buttonContainer: { marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default EventsList;
