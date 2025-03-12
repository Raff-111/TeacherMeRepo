import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Button, Alert, StyleSheet } from 'react-native';
import { Query } from 'react-native-appwrite';
import { account, database } from '@/lib/appwrite';

// Example questions
const questions = [
  { question: "Who is Valentine?", options: ['A. a duke who wrote sweet messages for men and women', 'B. a saint who started th celebration of Valentines Day', 'C. a governor who wrote rhyming valentine verses to his wife', 'D. a Roman priest who started the tradition of sending valentine cards'], correctAnswer: 'D. a Roman priest who started the tradition of sending valentine cards' },
  { question: "What kind of writing was used in the messages placed on the cards during the Victorian period?", options: ['A. calligraphy', 'B. lithograph', 'C. bronze', 'D. gold'], correctAnswer: 'A. calligraphy' },
  { question: "To whom did Valentine send his mesage before he died?", options: ['A. to his wife whome he loved very much', 'B. to the jailer`s daughter he befriended ', 'C. to his girlfriend whom he promised to marry', 'D. to the queen who is secretely his childhood sweet heart'], correctAnswer: 'B. to the jailer`s daughter he befriended' },
  { question: "HOw did the quality of card and workmanship improved during the Victorian Period?", options: ['A. the envelopes were done artistically', 'B. A white embossed card was used', 'C. Colors were added by tying a ribbon or a piece of silk', 'D. All of the above'], correctAnswer: 'D. All of the above' },
  { question: "What kind of messages were found in the booklet entitled 'Valentine Writer'?", options: ['A. Sentimental', 'B. sweet', 'C. straightforward', 'D. all of the above'], correctAnswer: 'D. all of the above' },
  { question: "Who among the following DID NOT contribute in the practice of sending Valentine messages?", options: ['A. Valentine', 'B. Charles', 'C. Victoria', 'D. governor of Massachusetts Bay Colony'], correctAnswer: 'C. Victoria' },
  { question: "Whom does the author refer to in the words 'not-so-verbally-gifted-male'?", options: ['A. men who cannot speak', 'B. men who are not literate', 'C. men who cannot afford to but valentine cards', 'D. Valentine wrote letters which were send on February 14'], correctAnswer: 'D. Valentine wrote letters which were send on February 14' },
  { question: "What did the author mean when he said in the passage that Valentine lost his head to love - Literally?", options: ['A. Valentine fell in love with a beautiful woman and did stupid thinds', 'B. Valentine disobeyed the emperor`s order and still married people', 'C. Valentine loved th jailer`s daughter who loves someone else', 'D. Valentine wrote letters which were sent on February 14'], correctAnswer: 'B. Valentine disobeyed the emperor`s order and still married people' },
  { question: "What is the passage about?", options: ['A. how a Roman priest started Valentine`s day', 'B. how sending of Valentine cards and message started', 'C. how people send valentine cards in different periods of history', 'D. how a collection of valentine messages was gathered together'], correctAnswer: 'B. how sending of Valentine cards and message started' },
  { question: "Who would most likely enjoy reading this passage?", options: ['A. priests', 'B. scientist', 'C. historians', 'D. All of the above'], correctAnswer: 'C. historians' },
];

export default function QuizScreen() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    const get = await account.get();
    setName(get.name);
  };

  const handleAnswerChange = (index, answer) => {
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
        { instructional_test: score, isSubmitted3: true }
      );

      console.log('Document updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    setIsSubmitted(true);
    Alert.alert(`Your score is: ${score} out of ${questions.length}`);
    await updateQuizScore(score);
    lockScreen();
    router.replace('/');
  };

  const lockScreen = () => {
    Alert.alert('Quiz Submitted', 'Your score has been submitted and the screen is now locked.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.passageTitle}>Passage Section</Text>
      <Text style={styles.passageText}>
      1,700 years ago, A Roman priest named Valentine lost his head to love -literally. He had been officiating at weddings against the emperor's orders. Because of his noble but dangerous act, he was imprisoned and sentenced to die. He befriended the jailer's daughter and before his death, he was said to have left her a good-bye letter signed "From your Valentine." Thus, it started the tradition of sending sentiments through cards.

Around 1400, Charles, Duke of Orleans, wrote rhyming valentine verses to his wife while imprisoned in the Tower of London. He finished his note with "Thou must be my valentine for none hath challenge me." The future governor of Massachusetts Bay Colony scribbled this note on - you guess it February 14, 1629. Though not all people were literate, valentine greetings were popular during the Middle Ages. In the early 1800's, a booklet entitled "Valentine Writers" came out making it easier for the not-so-verbally-gifted male to send Valentine messages. The booklet provided verses for every taste, from sentimental to sweet to downright straight forward. It helps young men to express their feeling in words eloquently.

The quality of card and the standard of workmanship improved in the Victorian period. The messages were carefully handwritten using the beautiful calligraphy of the time. A white embossed card was used and a ribbon, a small piece of silk, or even a lock of hair was added to create color. The envelopes, lithographed in bronze or gold were works of art themselves
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

      <Button title="Submit" onPress={handleSubmit} color="#F5C35C" disabled={isSubmitted} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8E1', // Pastel yellow background
  },
  contentContainer: {
    paddingBottom: 20, // Ensure the submit button is visible
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
});
