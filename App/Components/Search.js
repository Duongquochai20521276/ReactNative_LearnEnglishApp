import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { Audio } from 'expo-av';

const Search = ({ initialKeyword }) => {
  const [keyword, setKeyword] = useState(initialKeyword || '');
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState();
  const [searchClicked, setSearchClicked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleSearch = async (searchKeyword) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchKeyword}`);
      const wordData = response.data[0];

      setWordData(wordData);
      setError(null);
      setSearchClicked(true);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error.message);
      setError('Không tìm thấy kết quả cho từ đã cho.');
      setWordData(null);
      setSearchClicked(true);
    }
  };

  const handlePlayAudio = async (audioUrl, isUK) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(sound);

      return () => {
        sound.unloadAsync();
      };
    } catch (error) {
      console.error('Lỗi khi tải âm thanh', error);
    }
  };

  useEffect(() => {
    if (keyword) {
      handleSearch(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (initialKeyword) {
      setKeyword(initialKeyword);
    }
  }, [initialKeyword]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={[styles.scrollView, { maxHeight: showFullContent ? '100%' : 400 }]}
    >
      {wordData && (
        <View style={styles.resultContainer}>
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
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 16,
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
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

export default Search;
