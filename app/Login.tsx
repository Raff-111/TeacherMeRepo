import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { account, database } from '@/lib/appwrite';
import { useRouter } from 'expo-router';
import { Query } from 'react-native-appwrite';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response =await account.createEmailPasswordSession(email, password);
       await account.get();
      const db = await database.listDocuments(
        '67bf249900391a288d42',
        '67c44fa7003254bdb6be',
        [Query.equal('teacher_email', email)]
      );

      if (db.total > 0) {
        
        Alert.alert('LOGIN SUCCESSFUL')
        router.replace('/(root)/(tabs)forteachers/Thome')
      } else {
        const studentResponse = await database.listDocuments(
          '67bf249900391a288d42',
          '67c4559b0007ac2a4aa6',
          [Query.equal('student_email', email  )]
        );

        if (studentResponse.total > 0) {

          Alert.alert('LOGIN SUCCESSFUL')
          router.replace('./')
        } else {
          Alert.alert('Login Failed', 'No matching user found');
        }
      }
      console.log(response);
    } catch (error) {
      Alert.alert('Login Failed', 'Check your email and password');
      router.replace('/Login');
 
      console.error(error);
    }
  };


  const handleLoginRedirect = () => {
    router.push('/Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Login</Text>

   

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={styles.loginText}>Don't have an account? Register</Text>
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

export default Login;
