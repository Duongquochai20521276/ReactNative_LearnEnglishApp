import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker';

const languageOptions = [
  { label: 'Tiếng Việt', value: 'vi' },
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: '中文', value: 'zh-Hans' },
];

const TranslateApp = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('vi');
  const [toLanguage, setToLanguage] = useState('en');
  const handleTranslate = async () => {
    const key = 'fe7a3af744cd44f3bbb1331e920988c1';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';
    const location = 'global';

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
            'from': fromLanguage,
            'to': toLanguage,
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
      <View style={styles.languagePicker}>
        <Picker
          selectedValue={fromLanguage}
          onValueChange={(itemValue) => setFromLanguage(itemValue)}
          itemStyle={styles.pickerItem} // Đặt màu chữ cho Picker.Item
          style={styles.picker}
        >
          {languageOptions.map((lang) => (
            <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.languagePicker}>
        <Picker
          selectedValue={toLanguage}
          onValueChange={(itemValue) => setToLanguage(itemValue)}
          itemStyle={styles.pickerItem} // Đặt màu chữ cho Picker.Item
          style={styles.picker}
        >
          {languageOptions.map((lang) => (
            <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
          ))}
        </Picker>
      </View>
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
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  languagePicker: {
    height: 40,
    width: '100%', // Điều chỉnh chiều rộng nếu cần thiết
    marginBottom: 16,
    backgroundColor: '', // Đặt màu nền của Picker
  },
  picker: {
    color: 'blue', // Đặt màu chữ
  },
  pickerItem: {
    color: 'black', // Đặt màu chữ cho Picker.Item
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TranslateApp;
