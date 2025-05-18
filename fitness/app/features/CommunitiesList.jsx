import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { db, auth } from '../config/FirebaseConfig';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const CommunitiesList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const userId = auth.currentUser?.uid;

  const fetchCommunities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'communities'));
      const communitiesList = [];
      querySnapshot.forEach(doc => {
        communitiesList.push({ id: doc.id, ...doc.data() });
      });
      setCommunities(communitiesList);
      setLoading(false);
    } catch (error) {
      alert('Error fetching communities: ' + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    try {
      const communityRef = doc(db, 'communities', communityId);
      await updateDoc(communityRef, {
        members: arrayUnion(userId),
      });
      alert('You’ve successfully joined the community!');
      fetchCommunities(); // Refresh list to show "Leave" button
    } catch (error) {
      console.error('Error joining community:', error);
      alert('Error joining community. Please try again.');
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    try {
      const communityRef = doc(db, 'communities', communityId);
      await updateDoc(communityRef, {
        members: arrayRemove(userId),
      });
      alert('You’ve left the community.');
      fetchCommunities(); // Refresh list to show "Join" button
    } catch (error) {
      console.error('Error leaving community:', error);
      alert('Error leaving community. Please try again.');
    }
  };

  const handleViewCommunity = (communityId) => {
    router.push(`/features/${communityId}`);
  };

  const handleCreateCommunity = () => {
    router.push('/features/CreateCommunity');  // Navigate to Create Community Page
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View className='flex flex-row justify-between items-center'>
        <Text className='text-2xl font-bold'>Community List</Text>
        <TouchableOpacity onPress={handleCreateCommunity} style={styles.createButton} className='relative mr-4'>
          <Text style={styles.buttonText} className='text-4xl text-center'>+</Text>
        </TouchableOpacity>
      </View>

      {communities.length === 0 ? (
        <View style={styles.noCommunitiesContainer}>
          <Text style={styles.noCommunitiesText}>No communities available yet.</Text>
        </View>
      ) : (
        communities.map((community) => (
          <View key={community.id} style={styles.communityCard}>
            <Text style={styles.communityName}>{community.name}</Text>
            <Text style={styles.description}>{community.description}</Text>

            <View style={styles.buttonContainer}>
              {/* Display the appropriate button based on membership */}
              {community.members?.includes(userId) ? (
                <>
                  <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.leaveButton}>
                    <Text style={styles.buttonText}>Leave</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => handleJoinCommunity(community.id)} style={styles.joinButton}>
                  <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
              )}
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
  noCommunitiesContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  noCommunitiesText: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  createButton: {
    backgroundColor: '#4CAF50', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 10, 
    width: 60, 
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  communityCard: {
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
  communityName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#555', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  joinButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  leaveButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default CommunitiesList;
