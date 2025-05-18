import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();
  const { eventId } = useLocalSearchParams(); // Get the eventId from the URL

  const fetchEventDetails = async () => {
    try {
      const docRef = doc(db, 'events', eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        alert('No such event!');
      }
    } catch (error) {
      alert('Error fetching event details: ' + error.message);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (!event) {
    return <Text style={styles.loadingText}>Loading event details...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>Date: {event.date}</Text>
      <Text style={styles.location}>Location: {event.location}</Text>
      {/* Add more event details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  loadingText: { fontSize: 18, textAlign: 'center' },
  eventName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  date: { fontSize: 16, marginBottom: 10 },
  location: { fontSize: 16, marginBottom: 10 },
});

export default EventDetail;
