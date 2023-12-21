import React, { useContext } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import WelcomeHeader from '../Components/WelcomeHeader';
import SearchBar from '../Components/SearchBar';
import Translate from '../Components/Translate';
import VideoCourseList from '../Components/VideoCourseList';
import { AuthContext } from '../Context/AuthContext';
import VocabLearn from '../Pages/VocabLearn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
  const { userData, setUserData } = useContext(AuthContext);

  return (
    <ScrollView style={{ padding: 20 }}>
      <WelcomeHeader />
      <SearchBar />
      <Translate />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
});

export default Home;
