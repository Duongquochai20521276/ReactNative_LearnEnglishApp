import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const TranslateApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    const key = '67dc4e69113042088b819cb01b9d9b8f';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';
    const location = 'eastus';

    try {
      const response = await axios.post(
        `${endpoint}/translate`,
        [
          {
            text: inputText,
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
            'from': 'vi',
            'to': 'en',
          },
          responseType: 'json',
        }
      );

      const translation = response.data[0].translations[0].text;
      setTranslatedText(translation);
    } catch (error) {
      console.error('Translation error:', error);

      // Log more details about the error to the console
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received. Request:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        placeholder="Nhập văn bản cần dịch"
      />
      <Button title="Dịch" onPress={handleTranslate} />
      {translatedText !== '' && <Text style={styles.result}>Dịch: {translatedText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TranslateApp;
