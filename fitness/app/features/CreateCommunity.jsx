import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../config/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CreateCommunity = () => {
  const router = useRouter();
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateCommunity = async () => {
    if (!communityName || !description || !interests) {
      alert('Please fill in all required fields');
      return
    }

    setLoading(true);
    try {
      const newCommunity = {
        name: communityName,
        description,
        interests: interests.split(',').map(interest => interest.trim()), // Split by commas
        questions: questions.split(',').map(question => question.trim()),
        members: [auth.currentUser.uid],
        createdAt: new Date(),
        createdBy: auth.currentUser.uid
      };

      await addDoc(collection(db, 'communities'), newCommunity);
      alert('Community created successfully!');
      router.push('/features/CommunitiesList')  // Navigate back to the Communities list page
    } catch (error) {
      alert('Error creating community: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Community</Text>

      <TextInput
        style={styles.input}
        placeholder="Community Name"
        value={communityName}
        onChangeText={setCommunityName}
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
        placeholder="Interests (comma separated)"
        value={interests}
        onChangeText={setInterests}
      />
      <TextInput
        style={styles.input}
        placeholder="Questions for Members (comma separated)"
        value={questions}
        onChangeText={setQuestions}
        multiline
      />

      <TouchableOpacity onPress={handleCreateCommunity} style={styles.createButton}>
        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Community'}</Text>
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

export default CreateCommunity;
