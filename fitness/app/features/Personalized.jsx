import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

const workoutPlans = [
  {
    id: 'body',
    title: 'Full Body Workout',
    description: 'Target all muscle groups in one session.',
    image: 'https://www.endomondo.com/wp-content/uploads/2024/09/inner-chest-workout-endomondo.jpg',
  },
  {
    id: 'weightloss',
    title: 'Weight Loss',
    description: 'Burn fat and boost metabolism.',
    image: 'https://images.everydayhealth.com/images/diet-nutrition/weight/fat-but-fit-is-obesity-a-problem-if-you-have-other-good-markers-of-health-1440x810.jpg?sfvrsn=480b2ee4_5',
  },
  {
    id: 'cardio',
    title: 'Cardio',
    description: 'Improve endurance and heart health.',
    image: 'https://www.fitnessgallery.com/wp-content/uploads/2021/01/dumbbell-workouts-for-cardio-fitness.jpg',
  },
];

const Personalized = () => {
  const router = useRouter();

  const streakCount = 5; // Replace with dynamic data if needed

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Fitness Dashboard</Text>

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        markedDates={{
          '2025-04-24': { marked: true },
          '2025-04-25': { marked: true },
        }}
        theme={{
          selectedDayBackgroundColor: '#4CAF50',
          todayTextColor: '#FF6347',
          arrowColor: '#4CAF50',
        }}
      />

      {/* Streak Display */}
      <View style={styles.streakCard}>
        <Text style={styles.streakText}>🔥 Current Streak: {streakCount} Days</Text>
      </View>

      {/* Workout Plans */}
      <Text style={styles.sectionTitle}>Choose Your Workout Plan</Text>
      {workoutPlans.map(plan => (
        <TouchableOpacity key={plan.id} style={styles.card} onPress={() => router.push(`/features/workouts/${plan.id}`)}>
          <Image source={{ uri: plan.image }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{plan.title}</Text>
            <Text style={styles.cardDesc}>{plan.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  calendar: { borderRadius: 12, marginBottom: 16 },
  streakCard: {
    backgroundColor: '#E0FFE6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  streakText: { fontSize: 18, color: '#2E7D32', fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginVertical: 12 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  cardImage: { width: '100%', height: 150 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#666' },
});

export default Personalized;
