import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { questions } from '@/constants/normalquestions';
import { useRouter } from 'expo-router';
import { account, database } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

export default function NormalQuiz() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showPassage, setShowPassage] = useState(false);
  const [passageIndex, setPassageIndex] = useState(null);
  const [name, SetName] = useState('');

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    const get = await account.get();
    SetName(get.name);
  };

  const updateQuiz4 = async () => {
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
        { quiz4_score: score }
      );

      console.log('Document updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const GOTOHOME = () => {
    router.push('/');
  };

  const submitAnswer = async () => {
    if (answer) {
      setUserAnswers([
        ...userAnswers,
        { questionId: questions[currentQuestionIndex].id, answer },
      ]);

      const correctAnswer = questions[currentQuestionIndex].answer;
      if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        setScore(score + 1);
      }
    }

    setAnswer('');
    setPassageIndex(null); // Reset passage index when moving to the next question

    if (currentQuestionIndex < questions.length - 1 && !showPassage) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
      await updateQuiz4();
      Alert.alert('Quiz Completed', `Your score is ${score} / ${questions.length}`, [
        { text: 'Go to Homepage', onPress: GOTOHOME }
      ]);
    }
  };

  const handleOptionSelect = (option) => {
    setAnswer(option);
  };

  const handlePassageProceed = () => {
    setShowPassage(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];

    // Check if the question is in the range 6 to 11 (index 5 to 10)
    if (currentQuestionIndex >= 5 && currentQuestionIndex <= 10) {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Type your answer"
            autoCapitalize="none"
            editable={!isSubmitted}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.optionsContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}
              disabled={isSubmitted}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  const renderPassage = (passageText) => {
    return (
      <ScrollView style={styles.passageContainer}>
        <ScrollView>
          <Text style={styles.passageText}>
            {passageText}
          </Text>
          <Button title="Proceed to Next Question" onPress={handlePassageProceed} />
        </ScrollView>
      </ScrollView>
    );
  };

  const passageBetween13and14 = "While eating at a restaurant is an enjoyable and convenient occasional treat, most individuals and families prepare their meals at home. To make breakfast, lunch, and dinner daily, these persons must have the required foods and ingredients on hand and ready to go; foods and ingredients are typically purchased from a grocery store, or an establishment that distributes foods, drinks, household products, and other items that're used by the typical consumer. Produce, or the term used to describe fresh fruits and vegetables, is commonly purchased by grocery store shoppers. In terms of fruit, most grocery stores offer bananas, apples, oranges, blackberries, raspberries, grapes, pineapples, cantaloupes, watermelons, and more; other grocery stores with larger produce selections might offer the listed fruits in addition to less common fruits, including mangoes, honeydews, starfruits, coconuts, and more. Depending on the grocery store, customers can purchase fruits in a few different ways. Some stores will charge a set amount per pound of fruit, and will weigh customers' fruit purchases and bill them accordingly; other stores will charge customers for each piece of fruit they buy, or for bundles of fruit (a bag of bananas, a bag of apples, etc.); other stores yet will simply charge by the container. Vegetables, including lettuce, corn, tomatoes, onions, celery, cucumbers, mushrooms, and more are also sold at many grocery stores, and are purchased similarly to the way that fruits are. Grocery stores typically stock more vegetables than fruit at any given time, as vegetables remain fresh longer than fruits do, generally speaking. It`d take quite a while to list everything else that today`s massive grocery stores sell, but most customers take the opportunity to shop for staples, or foods that play a prominent role in the average diet, at the establishments. Staples include pasta, rice, flour, sugar, milk, meat, and eggs, and bread. All the listed staples are available in prepackaged containers, but can be purchased 'fresh' in some grocery stores, wherein employees will measure and weigh fresh products and then provide them to customers. ";

  return (
    <ScrollView style={styles.container}>
      {!isSubmitted ? (
        <View style={styles.quizContainer}>
          {(currentQuestionIndex === 12 && !showPassage) // Show passage between the 13th and 14th question
            ? renderPassage(passageBetween13and14)
            : renderQuestion()}

          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={submitAnswer} color="#388E3C" disabled={isSubmitted} />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  quizContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2E7D32',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#388E3C',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#388E3C',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
  },
  passageContainer: {
    marginBottom: 20,
    backgroundColor: '#C8E6C9',
    padding: 15,
    borderRadius: 10,
  },
  passageText: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 20,
  },
});


