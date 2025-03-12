import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter,  } from 'expo-router';
import { account, database } from '@/lib/appwrite';
import {Query} from 'react-native-appwrite'

const questions = [
  {
    question: "Yellowstone is an important national park in the United States because:",
    options: [
      "A. It is the most visited U.S. national park.",
      "B. It is the country’s first national park.",
      "C. It is the largest U.S. national park.",
      "D. It is the most ecologically diverse natural park."
    ],
    correctOption: "B. It is the country’s first national park."
  },
  {
    question: "When did Lisa and her friends visit Yellowstone National Park?",
    options: [
      "A. Last autumn",
      "B. Last spring",
      "C. Last summer",
      "D. Last winter"
    ],
    correctOption: "A. Last autumn"
  },
  {
    question: "Where did Lisa and her friends stay during their visit to the park?",
    options: [
      "A. In a rental home",
      "B. In a log cabin",
      "C. At a hotel",
      "D. At a campground"
    ],
    correctOption: "D. At a campground"
  },
  {
    question: "All of the following are animals that Lisa saw during her trip except:",
    options: [
      "A. Gray wolves",
      "B. Grizzly bears",
      "C. Wild horses",
      "D. Bald eagles"
    ],
    correctOption: "C. Wild horses"
  },
  {
    question: "Why did Lisa and her friends wait patiently when visiting Old Faithful?",
    options: [
      "A. They arrived an hour before the geyser opened to the public.",
      "B. The geyser took about 40 minutes to erupt.",
      "C. There was a long line to see the geyser.",
      "D. They were still wet from swimming in the Boiling River."
    ],
    correctOption: "B. The geyser took about 40 minutes to erupt."
  }
];

const XtraQuiz2 = () => {
  const router= useRouter();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  
    useEffect(() => {
      getName();
    }, []);
  
    const getName = async () => {
      const get = await account.get();
      setName(get.name);
    };

    const updateQuiz2 = async (newScore) => {
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
            { quiz2_score: newScore }
          );
    
          console.log('Document updated successfully');
        } catch (error) {
          console.log(error);
        }
      };

  const handleOptionPress = (questionIndex: string, option: string) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleSubmit = async () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResult(true);
    await updateQuiz2(newScore)
    Alert.alert('Thank you for Submitting', `Your score is ${newScore} / ${questions.length}`);
    router.replace('/')
  };

  const lockScreen = () => {
    Alert.alert('Quiz Submitted', 'Your score has been submitted and the screen is now locked.');
  };

  return (
  <SafeAreaView style={styles.View} >
    <ScrollView style={styles.container}>
      <View style={styles.passageContainer}>
        <Text style={styles.passageText}>
        Yellowstone National Park, located in Idaho, Montana, and Wyoming, was established as the first national park in the United States. The park is a popular destination for visitors who enjoy ecological tourism as it offers forests, mountains, and abundant ecosystems to explore. Some of Yellowstone’s most well-known landmarks are its geothermal hot springs and geysers, the most famous of which is named Old Faithful.

Last fall, Lisa and her friends decided to take a camping trip to Yellowstone National Park. They arranged to stay at one of the park’s many convenient campsites. For their camping trip, they brought their backpacks, sleeping bags, and a cooler of food and drinks. They pitched their tents immediately upon arriving to their campsite.

During their trip, Lisa and her friends hiked the many trails of the park, exploring its natural surroundings. In the forest, they saw a lot of local wildlife. Lisa was surprised to see a family of grizzly bears, some gray wolves, and even bald eagles flying overhead. Outside of the woods, they admired the beauty of some of Yellowstone’s natural cascades.

Since Yellowstone contains many hot springs and the world’s largest area of active geysers, Lisa and her friends visited many different geyser sites. They even spent an afternoon swimming in Yellowstone’s Boiling River. Of all of the sites, Lisa and her friends agreed that Old Faithful was the most impressive. Lisa and her friends waited patiently for the geyser to erupt. After about 40 minutes, a stream of boiling water over 100 feet tall sprayed from the ground and up into the air. Fortunately, no one got wet!
        </Text>
      </View>

      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.optionButton,
                answers[index] === option && styles.selectedOptionButton
              ]}
              onPress={() => handleOptionPress(index, option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Score: {score} / {questions.length}</Text>
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
    height:'90%'
  },
  passageContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#B2EBF2',
    borderRadius: 10,
  },
  passageText: {
    fontSize: 16,
    color: '#00796B',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#00796B',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#B2EBF2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#80DEEA',
  },
  optionText: {
    fontSize: 16,
    color: '#00796B',
  },
  submitButton: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#B2EBF2',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#00796B',
  },
  View: {
    height: '100%'
  }
});

export default XtraQuiz2;
