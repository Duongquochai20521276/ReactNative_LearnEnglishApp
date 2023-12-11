import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { Audio } from 'expo-av';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`);
      const wordData = response.data[0];

      setWordData(wordData);
      setError(null);
    } catch (error) {
      console.error('Error sending API request:', error.message);
      setError('No results found for the given word.');
      setWordData(null);
    }
  };

  const handlePlayAudio = async (audioUrl, isUK) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(sound);

      // Clean up the sound object on unmount
      return () => {
        sound.unloadAsync();
      };
    } catch (error) {
      console.error('Error loading audio', error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    
    <ScrollView
      contentContainerStyle={styles.container}
      style={[styles.scrollView, { maxHeight: showFullContent ? '100%' : 400 }]}
    >
      <View style={styles.input}>
      <TextInput
        placeholder="Search"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
        style={styles.input}
      />   
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Ionicons name="md-search" size={24} color={Colors.white} />
      </TouchableOpacity>
      </View>
      
      
      
      <TouchableOpacity onPress={() => setShowFullContent(!showFullContent)}>
            <Text style={styles.showFullContentButton}>
              {showFullContent ? 'Show Less' : 'Show More'}
            </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {wordData && (
        <View style={styles.resultContainer}>
          <Text style={styles.wordText}>Word: {wordData.word}</Text>
          <Text style={styles.phoneticText}>Phonetic: {wordData.phonetic}</Text>

          {wordData.phonetics.map((phonetic, index) => (
            <View key={index} style={styles.phoneticContainer}>
              <Text style={styles.phoneticText}>Phonetic Text: {phonetic.text}</Text>
              {phonetic.audio && (
                <TouchableOpacity onPress={() => handlePlayAudio(phonetic.audio, index === 0)}>
                  <View style={styles.audioContainer}>
                    <Text style={styles.audioAccentText}>
                      {index === 0 ? 'UK: ' : 'US: '}
                    </Text>
                    <Ionicons name="volume-high" size={24} color={Colors.primary} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {wordData.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaningContainer}>
              <Text style={styles.partOfSpeechText}>Part of Speech: {meaning.partOfSpeech}</Text>
              {meaning.definitions.map((definition, idx) => (
                <View key={idx} style={styles.definitionContainer}>
                  <Text style={styles.definitionText}>Definition: {definition.definition}</Text>
                  <Text style={styles.exampleText}>Example: {definition.example}</Text>
                </View>
              ))}
            </View>
          ))}

        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: Colors.background,
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
    flexDirection: 'row',
  alignItems: 'center',
  },
  searchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: Colors.error,
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneticContainer: {
    marginTop: 10,
  },
  phoneticText: {
    fontStyle: 'italic',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  audioAccentText: {
    marginRight: 5,
  },
  meaningContainer: {
    marginTop: 10,
  },
  partOfSpeechText: {
    fontWeight: 'bold',
  },
  definitionContainer: {
    marginTop: 5,
  },
  definitionText: {
    marginLeft: 10,
  },
  exampleText: {
    marginLeft: 10,
    fontStyle: 'italic',
    color: Colors.gray,
  },
  showFullContentButton: {
    color: Colors.primary,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SearchBar;
