import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { database, account } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

const Websiteredirect = () => {
  const [name, Setname] = useState('');
  const [result, setResult] = useState('');
  const [level, setLevel] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getName();

  }, []);

  const handleButtonPress = () => {
    if (!isSubmitted) {
      const url = 'https://teacher-me.github.io/TeacherMeWebsite101/';
      Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
    } else {
      Alert.alert('Access Denied', 'You have already submitted your score.');
    }
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      const score = parseInt(result);
      let level = '';

      if (score <= 7) {
        level = 'Frustration';
        Alert.alert('NAKS, ANG GALING!', 'You scored ' + score + '/20. Answer "Steady Flame" in the TEST section');
      } else if (score >= 8 && score <= 13) {
        level = 'Instructional';
        Alert.alert('GRABEE LAKASS!!', 'You scored ' + score + '/20. Answer "Glowing Strong" in the TEST section');
      } else if (score >= 14 && score <= 20) {
        level = 'Independent';
        Alert.alert('SLAYYYY!!', 'You scored ' + score + '/20. You do not need to answer anything in the TEST section but you will have access to all features!');
      }

      updateQuiz1(score, level);
      setIsSubmitted(true);
      router.replace('/');
    } else {
      Alert.alert('Access Denied', 'You have already submitted your score.');
    }
  };

  const getName = async () => {
    const get = await account.get();
    Setname(get.name);
  };

  const updateQuiz1 = async (score: number, level: string) => {
    try {
      const db = await database.listDocuments(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        [Query.equal('student_name', name)]
      );

      if (db.total === 0) {
        console.log('No document found');
        return;
      }

      const documentId = db.documents[0].$id;

      await database.updateDocument(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        documentId,
        { Test_result: score, reading_level: level, isSubmitted1: true }
      );

      console.log('Document updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const checkSubmissionStatus = async () => {
    try {
      const db = await database.listDocuments(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        [Query.equal('student_name', name)]
      );

      if (db.total > 0 && db.documents[0].isSubmitted) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Web}>
        <TouchableOpacity onPress={handleButtonPress}>
          <View style={styles.Website}>
            <Text className='text-lg font-rubik-black' style={{
              justifyContent: 'center',
              alignSelf: 'center',
              color: '#6A1B9A'
            }}>CLICK TO TAKE ASSESMENT TEST</Text>
          </View>
        </TouchableOpacity>
        <Text className='text-white font-rubik-bold text-xl' style={{
          alignSelf: 'flex-start',
          marginTop: 20
        }}> Hello!</Text>

        <Text className=' text-white font-rubik mt-2 flex flex-col' style={{
          textAlign: 'justify'
        }}>Please complete the following steps first to proceed with the app and gain access to its features </Text>
        <Text className=' text-white font-rubik flex flex-col' style={{
          textAlign: 'justify',
          marginTop: 9
        }}> 1. Go to our website for the assessment test for by clicking the button above </Text>
        <Text className=' text-white font-rubik mt-2 flex flex-col' style={{
          textAlign: 'justify',
          marginTop: 9
        }}> 2.Answer the exam and remember your score</Text>
        <Text className=' text-white font-rubik mt-2 flex flex-col' style={{
          textAlign: 'justify',
          marginTop: 9
        }}>3. Type your score to the 'Test Result' ( /20 )</Text>
        <Text className=' text-white font-rubik mt-2 flex flex-col' style={{
          textAlign: 'justify',
          marginTop: 9
        }}>NOTE! YOU CAN ONLY TAKE THIS TEST ONCE!</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Test Result</Text>
        <TextInput
          style={styles.input}
          value={result}
          onChangeText={setResult}
          placeholder="Enter your score as is  (e.g. 10 , 4)"
          placeholderTextColor="#B3B3B3"  // Light gray placeholder text
          editable={!isSubmitted}
        />
        <TouchableOpacity style={{
          backgroundColor: 'gray',
          justifyContent: 'center',
          height: 40,
          borderRadius: 15
        }} onPress={handleSubmit} >
          <Text style={{
            alignSelf: 'center'
          }} className='font-rubik-bold text-white'> SUBMIT </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Websiteredirect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A1B9A',  // Dark purple background
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  Web: {
    backgroundColor: '#8E24AA', // Lighter purple for the header section
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    height: 400,
    textAlign: 'center'
  },
  headerText: {
    fontSize: 24,
    color: '#fff',  // White text for header
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: '#6A1B9A', // Purple text for the label
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#6A1B9A', // Purple border
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#f8f8f8', // Light gray background for input field
  },
  Website: {
    backgroundColor: '#f8f8f8',
    height: 70,
    width: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
