import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { questions2 } from '@/constants/hardquestions';
import { useRouter } from 'expo-router';
import { account, database } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

export default function hardQuiz() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showPassage, setShowPassage] = useState(false); // Control passage display
  const [passageIndex, setPassageIndex] = useState(null); // Passage before first and between 8th-9th question
  const [name, SetName] = useState('');

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    const get = await account.get();
    SetName(get.name);
  };

  const updateQuiz5 = async () => {
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
        { quiz5_score: score }
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
        { questionId: questions2[currentQuestionIndex].id, answer },
      ]);

      const correctAnswer = questions2[currentQuestionIndex].answer;
      if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        setScore(score + 1);
      }
    }

    setAnswer('');
    setPassageIndex(null); // Reset passage index when moving to the next question

    if (currentQuestionIndex < questions2.length - 1 && !showPassage) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
      await updateQuiz5();
      Alert.alert('Quiz Completed', `Your Score: ${score} / ${questions2.length}`, [
        { text: 'Go to Homepage', onPress: GOTOHOME }
      ]);
    }
  };

  const handleOptionSelect = (option) => {
    setAnswer(option);
  };

  const handlePassageProceed = () => {
    setShowPassage(false);  // Hide the passage and continue with the quiz
    setCurrentQuestionIndex(currentQuestionIndex + 1);  // Go to next question
  };

  const renderQuestion = () => {
    const question = questions2[currentQuestionIndex];
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
  };

  const renderPassage = (passageText) => {
    return (
      <View style={styles.passageContainer}>
        <ScrollView>
          <Text style={styles.passageText}>
            {passageText}
          </Text>
          <Button title="Proceed to Next Question" onPress={handlePassageProceed} />
        </ScrollView>
      </View>
    );
  };

  // Define two different passages
  const passageBeforeFirst = "Spanish Flu Pandemic of 1918 The deadliest virus in modern history, perhaps of all time, was the 1918 Spanish Flu. It killed about 20 to 50 million people worldwide, perhaps more. The total death toll is unknown because medical records were not kept in many areas.The pandemic hit during World War I and devastated military troops. In the United States, for instance, more servicemen were killed from the flu than from the war itself. The Spanish flu was fatal to a higher proportion of young adults than most flu viruses.The pandemic started mildly, in the spring of 1918, but was followed by a much more severe wave in the fall of 1918. The war likely contributed to the devastating mortality numbers, as large outbreaks occurred in military forces living in close quarters. Poor nutrition and the unsanitary conditions of war camps had an effect.A third wave occurred in the winter and spring of 1919, and a fourth, smaller wave occurred in a few areas in spring 1920. Initial symptoms of the flu were typical: sore throat, headache, and fever. The flu often progressed rapidly to cause severe pneumonia and sometimes hemorrhage in the lungs and mucus membranes. A characteristic feature of severe cases of the Spanish Flu was heliotrope cyanosis, where the patient’s face turned blue from lack of oxygen in the cells. Death usually followed within hours or days.Modern medicine such as vaccines, antivirals, and antibiotics for secondary infections were not available at that time, so medical personnel couldn’t do much more than try to relieve symptoms.The flu ended when it had infected enough people that those who were susceptible had either died or developed immunity.";
  const passageBetween8and9 = "Las Vegas Last April, John took a trip to Las Vegas, Nevada. Las Vegas is a popular destination in the western portion of the United States. The town is most popular for its casinos, hotels, and exciting nightlife.In downtown Las Vegas, John spent a lot of time on The Strip, which is a 2.5 mile stretch of shopping, entertainment venues, luxury hotels, and fine dining experiences. This is probably the most commonly visited tourist area in the city. The Strip at night looks especially beautiful. All of the buildings light up with bright, neon, eye-catching signs to attract visitor attention.A stay in Las Vegas can feel similar to a visit to many popular cities worldwide. Many of the hotels have miniature versions of important international sites and monuments. These famous landmarks include the Eiffel Tower, Venice, and even ancient Rome.One day, John took a side trip outside of the city to visit the Grand Canyon, one of the Seven Wonders of the Natural World. The canyon offers a breathtaking view of Nevada’s ridges and natural landscape. John especially liked the canyon because it was removed from all of the noise and movement in downtown Las Vegas.John had a great time during his trip to Las Vegas. He did not win a lot of money in the casinos. However, he managed to see a lot of amazing sites during his visit to this city that never sleeps.";

  return (
    <ScrollView style={styles.container}>
      {!isSubmitted ? (
        <View style={styles.quizContainer}>
          {(currentQuestionIndex === 0 || currentQuestionIndex === 8) && !showPassage
            ? renderPassage(currentQuestionIndex === 0 ? passageBeforeFirst : passageBetween8and9)
            : renderQuestion()}

          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={submitAnswer} color="#D32F2F" disabled={isSubmitted} />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
    padding: 20,
  },
  quizContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFCDD2',
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
    color: '#C62828',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  passageContainer: {
    marginBottom: 20,
    backgroundColor: '#FFCDD2',
    padding: 15,
    borderRadius: 10,
  },
  passageText: {
    fontSize: 16,
    color: '#C62828',
    marginBottom: 20,
  },
  finalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C62828',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    color: "#C62828"
  }
});
