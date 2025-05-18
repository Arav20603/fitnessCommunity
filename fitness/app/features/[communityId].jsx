import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../config/FirebaseConfig'
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';

const CommunityDetails = () => {
  const { id } = useLocalSearchParams();
  const [community, setCommunity] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchCommunity = async () => {
      const docRef = doc(db, 'communities', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setCommunity(snap.data());
      }
    };

    const unsubscribe = onSnapshot(
      query(collection(db, 'communities', id, 'messages'), orderBy('timestamp')),
      (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    fetchCommunity();
    return () => unsubscribe();
  }, [id]);

  const handleSend = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'communities', id, 'messages'), {
        text: message,
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName,
        timestamp: new Date(),
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{community?.name}</Text>
      <Text style={styles.description}>{community?.description}</Text>

      <Text style={styles.subTitle}>Live Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.senderId === auth.currentUser.uid ? styles.myMessage : styles.otherMessage}>
            <Text style={styles.messageSender}>{item.senderName}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 20, color: '#555' },
  subTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 10, marginRight: 8, borderColor: '#ccc', borderWidth: 1 },
  sendButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#d1f7c4', borderRadius: 8, padding: 8, marginVertical: 4, maxWidth: '70%' },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', borderRadius: 8, padding: 8, marginVertical: 4, maxWidth: '70%' },
  messageSender: { fontWeight: 'bold', marginBottom: 2 },
  messageText: { fontSize: 14 },
});

export default CommunityDetails;
