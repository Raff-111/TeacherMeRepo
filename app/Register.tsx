import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { account, database } from '../lib/appwrite';
import { useRouter } from 'expo-router';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [key, setKey] = useState('');

  const router = useRouter();
  const ADMIN_KEY = 'GROUP7_TEACHERME'; // Replace with your actual admin key

  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword || !key) {
      Alert.alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (key === ADMIN_KEY) {
      TeacherName();
    } else {
      Alert.alert('Invalid Teacher Key')
    }

   
  };


  const handleLoginRedirect = () => {
    router.push('/Login');
  };

  const TeacherName = async () => {
    try {
      const setname = await account.create('unique()', email, password, name);
      await account.createEmailPasswordSession(email, password);
      await database.createDocument('67bf249900391a288d42' ,'67c44fa7003254bdb6be', 'unique()',{
        teacher_name:name,
        teacher_email: email
      })
      router.push('/(root)/(tabs)forteachers/Thome');
      console.log(setname)
    } catch (error) {
      console.log (error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password (min. 8 Characters)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Admin Key"
          secureTextEntry ={false}
          value={key}
          onChangeText={setKey}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={styles.loginText}>Have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#b100cd',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#be2ed6',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
});

export default Register;
