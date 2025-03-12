import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, Pressable, Alert, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import images from '@/constants/images';
import { database, account } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

const Index = () => {
  const router = useRouter();
  const [instructionalLocked, setInstructionalLocked] = useState(true);
  const [frustrationLocked, setFrustrationLocked] = useState(true);
  const [instructionalHide, setInstructionalHide] = useState(false);
  const [frustrationHide, setFrustrationHide] = useState(false);
  const [name, setName] = useState('');
  const [isSubmitted1, setIsSubmitted1] = useState(false);
  const [isSubmitted2, setIsSubmitted2] = useState(false);
  const [isSubmitted3, setIsSubmitted3] = useState(false);
  const [weblock, Setweblock] = useState (false)

  useEffect(() => {
    getNameAndStatus();
  }, []);

  const handleNullTestResult = () => {
    setFrustrationLocked(true);
    setInstructionalLocked(true);
  };

  const getNameAndStatus = async () => {
    try {
      const get = await account.get();
      setName(get.name);
      console.log(get);

      // Fetch submission status and test result
      const db = await database.listDocuments(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        [Query.equal('student_name', get.name)]
      );
      console.log(db);

      if (db.total > 0) {
        const { isSubmitted1, isSubmitted2, isSubmitted3, Test_result } = db.documents[0];
        setIsSubmitted1(isSubmitted1);
        setIsSubmitted2(isSubmitted2);
        setIsSubmitted3(isSubmitted3);

        if (Test_result === null) {
          handleNullTestResult();
        } else {
          // Unlock quizzes based on test_result
          if (Test_result <= 7) {
            setFrustrationLocked(false);
          } else if (Test_result >= 8 && Test_result <= 13) {
            setInstructionalLocked(false);
          } else if (Test_result >= 14) {
            setFrustrationLocked(false);
            setInstructionalLocked(false);
          }
        }

        // Lock quizzes based on submission status
        if (isSubmitted1) {
          Setweblock(true);
        }
        if (isSubmitted2) {
          setFrustrationHide(true);
        }
        if (isSubmitted3) {
          setInstructionalHide(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GotoFrustration = () => {
    if (frustrationLocked || frustrationHide) {
      Alert.alert('Access Denied');
    } else {
      router.push('/(root)/(tabs) quizzes/Frustration');
    }
  };

  const GotoXtra1 = () => {
    router.push('/(root)/(tabs) quizzes/xtraQuiz1');
  };

  const GotoXtra2 = () => {
    router.push('/(root)/(tabs) quizzes/xtraQuiz2');
  };

  const GotoXtra3 = () => {
    router.push('/(root)/(tabs) quizzes/xtraQuiz3');
  };

  const GotoNormal = () => {
    router.push('/(root)/(tabs) quizzes/Normal');
  };

  const GotoDifficult = () => {
    router.push('/(root)/(tabs) quizzes/Difficult');
  };

  const GotoInstructional = () => {
    if (instructionalLocked || instructionalHide) {
      Alert.alert('Access Denied');
    } else {
      router.push('/(root)/(tabs) quizzes/Instructional');
    }
  };

  const GotoWeb = () => {
    if (weblock) {
      Alert.alert('Access Denied');
      router.push('./');
    } else {
      router.push('/Websiteredirect');
    }
  };

  return (
    <SafeAreaView className='h-full' style={{ backgroundColor: '#EFE6D9' }}>
      <View style={styles.header}>
        <Text className='font-rubik-black text-white text-6xl mt-1.5'>TeacherMe</Text>
      </View>
      <ScrollView className='h-full'>
        <Text className='text-2xl font-rubik-bold mt-5' style={{ marginLeft: 18, color: 'e6cc00' }}>TEST</Text>
        <View style={styles.Container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <Pressable onPress={GotoFrustration}>
                <Image source={images.banner1} resizeMode='cover' style={styles.Quiz} />
                <Text className='text-s font-rubik mt-1'>STEADY FLAME</Text>
              </Pressable>
            </View>

            <View>
              <Pressable onPress={GotoInstructional}>
                <Image source={images.banner2} resizeMode='cover' style={styles.Quiz} />
                <Text className='text-s font-rubik mt-1'>GLOWING STRONG</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={GotoWeb} style={styles.WebButton} >
          <Text className='font-rubik-bold text-white'>TAKE PHIL-IRI TEST</Text>
        </TouchableOpacity>


        <View style={styles.Container2}>
          <Text className='text-xl font-rubik-bold'>Practice Quiz</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Pressable onPress={GotoXtra1}>
                <Image source={images.Quiz2} style={styles.Quiz2} />
                <Text className='text-s font-rubik mt-1'>Quiz 1</Text>
              </Pressable>
            </View>

            <View>
              <Pressable onPress={GotoXtra2}>
                <Image source={images.Quiz3} style={styles.Quiz2} />
                <Text className='text-s font-rubik mt-1'>Quiz 2</Text>
              </Pressable>
            </View>

            <View>
              <Pressable onPress={GotoXtra3}>
                <Image source={images.quizeasy} style={styles.Quiz2} />
                <Text className='text-s font-rubik mt-1'>Quiz 3</Text>
              </Pressable>
            </View>

            <View>
              <Pressable onPress={GotoNormal}>
                <Image source={images.quiznormal} style={styles.Quiz2} />
                <Text className='text-s font-rubik mt-1'>Quiz 4</Text>
              </Pressable>
            </View>

            <View>
              <Pressable onPress={GotoDifficult}>
                <Image source={images.quizdifficult} style={styles.Quiz2} />
                <Text className='text-s font-rubik mt-1'>Quiz 5</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    alignContent: 'center',
    padding: 10,
    height: 190,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  Container2: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    height: 370,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  header: {
    height: 60,
    backgroundColor: '#ca5cdd',
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#aaa7ad',
  },
  Quiz: {
    width: 200,
    height: 150,
    backgroundColor: '#f3f3f3',
    marginRight: 20,
    borderRadius: 10,
  },
  Quiz2: {
    width: 300,
    height: 200,
    backgroundColor: '#f3f3f3',
    marginTop: 20,
    borderRadius: 10,
  },
  WebButton: {
    backgroundColor: '#be2ed6',
    height: 50,
    width: '90%',
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

