// VocabLearn.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Flashcard from '../Components/flashcard';

const VocabLearn = () => {
  const vocabularyList = [
    'Hello',
    'World',
    'React',
    'Native',
    'Component',
    'Array',
    'Element',
    'Display',
    'TouchableOpacity',
    'Example',
  ];

  return (
    <View style={styles.container}>
      <Flashcard vocabularyList={vocabularyList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VocabLearn;
