import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as Speech from 'expo-speech';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = response.data[0];
      const meanings = data.meanings;
      const defs = meanings.flatMap(meaning => meaning.definitions.map(def => def.definition));
      const syns = meanings.flatMap(meaning => meaning.synonyms);
      const ants = meanings.flatMap(meaning => meaning.antonyms);
      setDefinitions(defs);
      setSynonyms(syns);
      setAntonyms(ants);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching data.');
      setLoading(false);
    }
  };

  const handleClear = () => {
    setWord('');
    setDefinitions([]);
    setSynonyms([]);
    setAntonyms([]);
    setError('');
  };

  const handleTextToSpeech = (text) => {
    Speech.speak(text);
  };

  return (
    <SafeAreaView className='h-full' style={{ backgroundColor: '#EFE6D9' }}>
      <View style={styles.header}>
        <Text className='font-rubik-black text-white text-6xl mt-1.5'>TeacherMe</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={word}
            onChangeText={setWord}
            placeholder="Enter a word"
            placeholderTextColor="#B39DDB"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.speechButton} onPress={() => handleTextToSpeech(word)}>
            <Text style={styles.speechButtonText}>🔊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.resultsText} className='font-rubik-medium'>Results for: {word}</Text>
        <ScrollView style={styles.meaningContainer}>
          <Text style={styles.sectionTitle}>Definitions:</Text>
          {definitions.length > 0 ? (
            definitions.map((definition, index) => (
              <Text key={index} style={styles.meaningText}>• {definition}</Text>
            ))
          ) : (
            <Text style={styles.meaningText}>No definitions found.</Text>
          )}
          <Text style={styles.sectionTitle}>Synonyms:</Text>
          {synonyms.length > 0 ? (
            synonyms.map((synonym, index) => (
              <Text key={index} style={styles.meaningText}>• {synonym}</Text>
            ))
          ) : (
            <Text style={styles.meaningText}>No synonyms found.</Text>
          )}
          <Text style={styles.sectionTitle}>Antonyms:</Text>
          {antonyms.length > 0 ? (
            antonyms.map((antonym, index) => (
              <Text key={index} style={styles.meaningText}>• {antonym}</Text>
            ))
          ) : (
            <Text style={styles.meaningText}>No antonyms found.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EFE6D9',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#4A148C',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#4A148C',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#4A148C',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: '#FF4081',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultsText: {
    fontSize: 18,
    color: '#4A148C',
    marginBottom: 10,
  },
  meaningContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginTop: 10,
  },
  meaningText: {
    fontSize: 16,
    color: '#4A148C',
    marginTop: 5,
  },
  speechButton: {
    marginLeft: 10,
    backgroundColor: '#4A148C',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    height: 60,
    backgroundColor: '#ca5cdd',
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#aaa7ad',
    flexDirection: 'row',
  },
});

export default Dictionary;
