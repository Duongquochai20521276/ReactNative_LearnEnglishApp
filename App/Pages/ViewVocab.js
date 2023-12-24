// ViewVocab.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const ViewVocab = () => {
  const navigation = useNavigation();

  const vocabList = vocabularyList.map((word, index) => ({ id: index.toString(), word }));

  const handleDelete = (id) => {
    // Xử lý logic xóa từ vựng ở đây
    console.log(`Xóa từ vựng có id: ${id}`);
  };

  const handleDetail = (word) => {
   
  };

  const handleGoBack = () => {
    // Xử lý khi nút quay lại được nhấn
    navigation.goBack();
    };

  return (
    <View style={styles.container}>
      <FlatList
        data={vocabList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.word}>{item.word}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDetail(item.word)} style={styles.button}>
                <Text style={styles.buttonText}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  goBackButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default ViewVocab;
