import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Search from './Search';


const Flashcard = ({ vocabularyList }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const navigation = useNavigation();

  const handleSaveWord = () => {
    console.log('Word saved:', currentWord);
  };

  const handleDone = () => {
    navigation.goBack();
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + vocabularyList.length) % vocabularyList.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{vocabularyList[currentCardIndex].word}</Text>
        <Text style={styles.translatedText}>{vocabularyList[currentCardIndex].meaning}</Text>
      </View>
      <Search initialKeyword={vocabularyList[currentCardIndex].word} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c', marginBottom: 10 }]} onPress={handleSaveWord}>
          <Text style={styles.buttonText}>Lưu từ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { marginRight: 5 }]} onPress={handlePrevCard}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginRight: 5 }]} onPress={handleNextCard}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#27ae60', marginLeft: 5 }]} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
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
  },
  card: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  translatedText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Flashcard;
