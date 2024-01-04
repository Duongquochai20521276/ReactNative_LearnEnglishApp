import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ListTopic = () => {
  const navigation = useNavigation();

  const courseList = [
    { id: 1, name: 'School' },
    { id: 2, name: 'Environment' },
    { id: 3, name: 'Family' },
    { id: 4, name: 'Food' },
  ];

  const navigateToVocabLearn = (courseName) => {
    navigation.navigate('VocabLearn', { courseName });
  };

  return (
    <View style={styles.container}>
      {courseList.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.courseButton}
          onPress={() => navigateToVocabLearn(course.name)}
        >
          <Text style={{fontSize:30}}>{course.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseButton: {
    padding: 10,
    margin: 5,
    marginVertical:10,
    // borderWidth: 1,
    borderRadius: 5,
    width:'90%',
    alignItems:'center',
    backgroundColor:'#3EC1D3'
  },
});

export default ListTopic;
