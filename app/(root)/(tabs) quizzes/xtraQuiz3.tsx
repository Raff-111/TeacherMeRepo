import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {account, database} from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';


const questions = [
  {
    question: "When does halloween take place?",
    options: ["A. February 14", "B. October 31", "C. eight weeks before christmas", "D. December 25"],
    correctOption: "B. October 31"
  },
  {
    question: "How do most children celebrate Halloween?",
    options: ["A. by studying schoolwork", "B. By producing candies", "C. by hanging ornaments on a Christmas Tree", "D. By dressing in costume and trick-or-treating"],
    correctOption: "D. By dressing in costume and trick-or-treating"
  },
  {
    question: "What day of the week does halloween fall on?",
    options: ["A. Haloween's day of the week varies by the year", "B. Halloween is always on Friday", "C. Halloween is always on Monday", "D. Halloween is always on saturday"],
    correctOption: "A. Haloween's day of the week varies by the year"
  },
  {
    question: "One can expect to see all of the following types of decorations on halloween except??",
    options: ["A. vampires", "B. Snowflakes and ribbons", "C. Gravestones and zombies", "D. Spiders and other bugs"],
    correctOption: "B. Snowflakes and ribbons"
  },
  {
    question: " Some adults celebrate Halloween in which of the following ways?",
    options: ["A. Trick-or-treating", "B. Going to bed early", "C. Buying Christmas gifts", "D. Attending Halloween parties"],
    correctOption: "D. Attending Halloween parties "
  }
];

const XtraQuiz3 = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState('');
    
      useEffect(() => {
        getName();
      }, []);
    
      const getName = async () => {
        const get = await account.get();
        setName(get.name);
      };
  
      const updateQuiz3 = async (newScore: boolean) => {
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
              { quiz3_score: newScore }
            );
      
            console.log('Document updated successfully');
          } catch (error) {
            console.log(error);
          }
        };
  
  const router = useRouter();

  const handleOptionPress = (questionIndex : string, option : string) => {
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
    setIsSubmitted(true);
    await updateQuiz3(newScore)
    Alert.alert('Thank you for Submitting', `Your score is ${newScore} / ${questions.length}`);
    router.replace('/');
  };

  const lockScreen = () => {
    Alert.alert('Quiz Submitted', 'Your score has been submitted and the screen is now locked.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.passageContainer}>
        <Text style={styles.passageText}>
        Halloween (also referred to as All Hollows' Eve) is a holiday that's celebrated in America on 31 October of each year, regardless of what day of the week this date falls on. Although it is rooted in religion, Halloween today is enjoyed mainly because of its decorations, costumes, candy, treats, and general excitement, and furthermore, it is enjoyed by most everyone.

Before Halloween, many individuals carve a design into an orange-colored pumpkin, or a solid, durable vegetable. Once a personally satisfying design is carved, a lit candle is typically put inside a pumpkin, thereby making it a Jack-O-Lantern. At night, this design lights up against the darkness.

Besides carving pumpkins, some celebrate Halloween by putting decorations up. Supernatural (referring in this case to non-natural creatures that are typically based in fiction) figures, including vampires, ghosts, werewolves, zombies, and more, generally account for most of these decorations. Bugs, spiders, cobwebs, gravestones, and anything else that can be considered creepy (or unusual and possibly scary) can also be found on Halloween, in decoration form.

Only some adults celebrate Halloween, and they generally do so by attending parties. Inversely, the vast majority of children dress in costume (Halloween costumes can be based upon anything, from the mentioned supernatural creatures to the stars of today's films) and walk from door to door in search of candy—a practice known as trick or treat—on Halloween. After knocking on a door (houses that participate in Halloween usually leave a light on), one says, "Trick or Treat" and a piece (or pieces!) of candy is given to him or her.


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
              disabled={isSubmitted}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitted}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Score: {score} / {questions.length}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    padding: 20,
  },
  passageContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E1BEE7',
    borderRadius: 10,
  },
  passageText: {
    fontSize: 16,
    color: '#4A148C',
  },
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#D1C4E9',
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#4A148C',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#B39DDB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#9575CD',
  },
  optionText: {
    fontSize: 16,
    color: '#4A148C',
  },
  submitButton: {
    backgroundColor: '#4A148C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E1BEE7',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#4A148C',
  },
});

export default XtraQuiz3;
