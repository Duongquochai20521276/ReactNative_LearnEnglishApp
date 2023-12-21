// Flashcard.js
import axios from 'axios';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Search from '../Components/Search';
import { useNavigation } from '@react-navigation/native';
import Home from '../Pages/Home';

const translateText = async (textToTranslate) => {
  const key = '67dc4e69113042088b819cb01b9d9b8f';
  const endpoint = 'https://api.cognitive.microsofttranslator.com/';
  const location = 'eastus';

    const response = await axios.post(
      `${endpoint}/translate`,
      [
        {
          text: textToTranslate,
        },
      ],
      {
        baseURL: endpoint,
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4(),
        },
        params: {
          'api-version': '3.0',
          'from': 'en',
          'to': 'vi',
        },
        responseType: 'json',
      }
    );
    return response.data[0].translations[0].text;
  
};


const handleSaveWord = () => {
   
  };



const Flashcard = ({ vocabularyList }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate('home');
  };
  const fetchTranslation = async (textToTranslate) => {
    try {
      const translatedText = await translateText(textToTranslate);
      setTranslatedText(translatedText);
    } catch (error) {
      // Handle translation error
      console.error('Translation error:', error);
      setTranslatedText('Translation error');
    }
  };

  useEffect(() => {
    // Fetch translation when component mounts or vocabulary changes
    fetchTranslation(vocabularyList[currentCardIndex]);
  }, [vocabularyList, currentCardIndex]);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % vocabularyList.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + vocabularyList.length) % vocabularyList.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{vocabularyList[currentCardIndex]}</Text>
        <Text style={styles.translatedText}>{translatedText}</Text>
      </View>
      <Search initialKeyword={vocabularyList[currentCardIndex]} />
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
