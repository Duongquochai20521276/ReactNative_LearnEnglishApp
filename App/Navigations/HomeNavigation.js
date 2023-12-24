import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Pages/Home';
import VocabLearn from '../Pages/VocabLearn';
import ViewVocab from '../Pages/ViewVocab';
import ListTopic from '../Pages/ListTopic';
import MainTab from '../Pages/MainTab';

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="ViewVocab" component={ViewVocab} />
        <Stack.Screen name="ListTopic" component={ListTopic} />
        <Stack.Screen name="VocabLearn" component={VocabLearn} />
      </Stack.Navigator>
  );
}
