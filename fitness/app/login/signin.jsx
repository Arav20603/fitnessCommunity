import { Alert, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { auth } from '../config/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { storeUserData } from '../services/Storage'

const SignIn = () => {

    const router = useRouter()
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')

    const OnSignIn = () => {

        if (!email || !password) {
            ToastAndroid.show("Fields should not be empty", ToastAndroid.BOTTOM)
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user)
            ToastAndroid.show("Logged in successfully", ToastAndroid.BOTTOM)
            // await setLocalStorage('userDetail', JSON.stringify(user))
            // await storeUserData(user)
            setTimeout(() => {
                router.replace('/(tabs)/Profile')
            }, 500);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
        });
    }
  return (
    <View>
      <Text style={styles.head}>Let's sign you in...</Text>
      <Text style={[styles.head, styles.head1]}>Welcome back</Text>
      <Text style={[styles.head, styles.head1]}>You've been missed</Text>

      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text style={styles.label}>Email:</Text>
        <TextInput placeholder='Enter your email' style={styles.textInput} 
            onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text style={styles.label}>Password:</Text>
        <TextInput placeholder='Enter  your password' style={styles.textInput} 
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity style={{
        marginTop: 40,
        alignItems: 'center'
      }}
        onPress={OnSignIn}
      >
        <Text style={styles.loginBtn}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        marginTop: 30,
        alignItems: 'center'
      }}
        onPress={() => router.push('/login/createAccount')}
      >
        <Text style={styles.createBtn}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
    head: {
        fontSize: 25,
        fontWeight: 600,
        padding: 5,
        marginTop: 5,
        marginLeft: 10
    },
    head1: {
        color: 'gray'
    },
    textInput: {
        marginLeft: 15,
        marginTop: 10,
        borderWidth: 1,
        width: 350,
        borderRadius: 10,
        padding: 10
    },
    label: {
        fontWeight: 600,
    },
    loginBtn: {
        backgroundColor: 'blue',
        width: 350,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 400,
        padding: 10,
        color: 'white',
        borderRadius: 10
    },
    createBtn: {
        backgroundColor: 'white',
        width: 350,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 400,
        padding: 10,
        color: 'blue',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightblue'
    },
})