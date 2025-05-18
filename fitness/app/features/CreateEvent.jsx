import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../config/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateEvent = () => {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (!eventName || !description || !date || !time || !location) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const newEvent = {
        name: eventName,
        description,
        date,
        time,
        location,
        createdAt: new Date(),
        createdBy: auth.currentUser.uid
      };

      await addDoc(collection(db, 'events'), newEvent);
      alert('Event created successfully!');
      router.push('/features/EventsList');  // Navigate back to the Events list page
    } catch (error) {
      alert('Error creating event: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity onPress={handleCreateEvent} style={styles.createButton}>
        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Event'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  createButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default CreateEvent;
