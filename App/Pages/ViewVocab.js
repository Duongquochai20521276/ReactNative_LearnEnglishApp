// ViewVocab.js
import React,{useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListWordUser from './ListWordUser';
import WordofList from './WordofList';
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
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ListWordUser">
        <Stack.Screen  options={{headerShown:true,animation:'fade'}} name="WordofList" component={WordofList} />
        <Stack.Screen name="ListWordUser" component={ListWordUser} />
      </Stack.Navigator>
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
