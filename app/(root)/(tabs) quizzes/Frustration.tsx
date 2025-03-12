import { useRouter } from 'expo-router';
import React, { useState,  useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
import { Query } from 'react-native-appwrite';
import { account,database } from '@/lib/appwrite';

const questions = [
  {
    question: "During the ancient times, who wear shoes aside from royalty?",
    options: [
      "a. Emperors and Kings",
      "b. Egyptians",
      "c. Greeks",
      "d. no one"
    ],
    correctAnswer: "d. no one"
  },
  {
    question: "What was the purpose of the first shoe?",
    options: [
      "a. for comfort",
      "b. for fashion",
      "c. for popularity",
      "d. for functionality"
    ],
    correctAnswer: "d. for functionality"
  },
  {
    question: "What event happened first in the history of shoes?",
    options: [
      "a. the making and wearing of moccasins",
      "b. the making and wearing of sneakers",
      "c. the making and wearing of plimsolls",
      "d. the making and wearing of sandals"
    ],
    correctAnswer: "d. the making and wearing of sandals"
  },
  {
    question: "Which civilization was the first to wear shoes to make fashion statement?",
    options: [
      "a. Greek",
      "b. Roman",
      "c. Egyptian",
      "d. Persian"
    ],
    correctAnswer: "a. Greek"
  },
  {
    question: "What are shoes made of flexible canvas called?",
    options: [
      "a. sandals",
      "b. plimsolls",
      "c. sneakers",
      "d. moccasin"
    ],
    correctAnswer: "c. sneakers"
  },
  {
    question: "Based on the passage, which of the following is NOT a material used in making shoes?",
    options: [
      "a. animal hides",
      "b. canvass",
      "c. rubber",
      "d. plastic"
    ],
    correctAnswer: "d. plastic"
  },
  {
    question: "Why were the royalties only the ones capable of wearing shoes during the ancient times?",
    options: [
      "a. Shoes then were reserved for kings and queens only.",
      "b. Only the royalties are allowed by law to wear shoes.",
      "c. The ordinary people are not allowed to wear shoes.",
      "d. Making shoes during that time was expensive."
    ],
    correctAnswer: "d. Making shoes during that time was expensive."
  },
  {
    question: "Why do people from the North use hides of furry animals in making their shoes?",
    options: [
      "a. It is easier to make shoes using animal fur.",
      "b. It keeps them warm from the cold climate.",
      "c. The shoes made from furry animals last longer.",
      "d. The cold weather makes it impossible to use other materials."
    ],
    correctAnswer: "b. It keeps them warm from the cold climate."
  },
  {
    question: "What does the passage tells us?",
    options: [
      "a. the materials used in making used",
      "b. the process of making sandals",
      "c. the different kinds of footwear",
      "d. the history of footwear"
    ],
    correctAnswer: "d. the history of footwear"
  },
  {
    question: "How is the basic sandal crafted by people more than four thousand years ago similar to shoes we wear today?",
    options: [
      "a. Shoes before and today are still used for comfort and functionality.",
      "b. The materials used than four thousand years ago did not change until today.",
      "c. Both the shoes use in the ancient past and at present were made by the same people.",
      "d. The design and style of shoes today were copied from the design and style of the past"
    ],
    correctAnswer: "a. Shoes before and today are still used for comfort and functionality."
  }
];

export default function QuizScreen() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    const get = await account.get();
    setName(get.name);
  };

  const updateQuizScore = async (score) => {
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
        { frustration_test: score, isSubmitted2: true }
      );

      console.log('Document updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const handleAnswerChange = (index , answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    setIsSubmitted(true);
    Alert.alert(`Your score is: ${score} out of ${questions.length}`);
    await updateQuizScore(score);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.passageTitle}>Passage Section</Text>
        <Text style={styles.passageText}>
          Shoes were not always an important part of people's wardrobes. During the ancient time, people actually went barefoot most of the time. They lived in regions where the weather was temperate, and shoes were not needed to keep their feet warm. Although archaeologists have found shoes in the ruins of these civilizations, they seem to have been worn mainly by royalty, who could afford to employ tailors and shoemakers.
          As shoes became more common in ancient Egypt, the first ones were simple sandals created mainly to protect the soles of the feet from rough surfaces. Among the ancient Greeks, sandals from the hides of animal were used. At first, these were purely functional,but over time most were dyed and decorated to make fashion statements. Likewise. The Romans wore sandals much like the Greeks did, but used more pieces of leather to make them. Meanwhile, people who lived in cold northern climates made shoes from the hides of furry animals, such as polar bears and yaks. These were called a moccasin.
          The major change in shoes over the last century has been the use of materials.Rubber heels became popular because they lasted much longer. The first rubber soled shoes were called plimsolls and were manufactured in the United States. Then shoes using a flexible canvas as the upper material were invented. This was the original "sneakers." By the 1980s, companies began to design athletic shoes for specific sports, helping athletes perform better while protecting their feet and providing comfort.
          Shoes have come a long way since the ancient Egyptians created their first sandals.Many more types of materials are used, and shoes have never been more comfortable or supportive for feet. Even so, it is interesting that the basic sandal, crafted by people more than four thousand years ago, still has many similarities to shoes we wear today.
        </Text>

        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                onPress={() => handleAnswerChange(index, option)}
                style={[
                  styles.optionButton,
                  answers[index] === option ? styles.selectedOption : null
                ]}
                disabled={isSubmitted}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#F5C35C" disabled={isSubmitted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1', // Pastel yellow background
  },
  scrollContainer: {
    padding: 20,
  },
  passageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800', // Pastel yellow-orange
    marginBottom: 10,
  },
  passageText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFEB3B', // Light pastel yellow background
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0C36D',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#FFF9C4', // Pastel yellow highlight for selected
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#FFF8E1',
  },
});
