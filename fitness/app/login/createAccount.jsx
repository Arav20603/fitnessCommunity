import { Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth, db } from '../config/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const CreateAccount = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [habits, setHabits] = useState('');
  const [sportsInterest, setSportsInterest] = useState('');
  const [goals, setGoals] = useState('');

  const OnCreateAccount = () => {
    if (!email || !password || !userName) {
      ToastAndroid.show('Please fill all required details', ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await updateProfile(user, { displayName: userName });

        // Store user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: userName,
          email,
          habits,
          sportsInterest,
          goals,
          createdAt: new Date()
        });

        ToastAndroid.show('User created successfully', ToastAndroid.TOP);
        router.push('/login/signin');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('Email already exists', ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show('Error creating user', ToastAndroid.BOTTOM);
          console.log(error);
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.head}>Create New Account</Text>

      <TextInput placeholder="Full Name" style={styles.textInput} onChangeText={setUserName} />
      <TextInput placeholder="Email" style={styles.textInput} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.textInput} onChangeText={setPassword} />
      <TextInput placeholder="Your Daily Habits" style={styles.textInput} onChangeText={setHabits} />
      <TextInput placeholder="Sports or Fitness Interests" style={styles.textInput} onChangeText={setSportsInterest} />
      <TextInput placeholder="Your Fitness Goals" style={styles.textInput} onChangeText={setGoals} />

      <TouchableOpacity onPress={OnCreateAccount} style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login/signin')} style={styles.createBtn}>
        <Text style={styles.createBtnText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  head: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  loginBtn: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginBtnText: { color: '#fff', fontWeight: 'bold' },
  createBtn: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  createBtnText: { color: '#1E90FF', fontWeight: 'bold' },
});
