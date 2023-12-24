import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Pages/Home';
import CourseDetails from '../Pages/CourseDetails';
import CourseChapter from '../Pages/CourseChapter';
import PlayVideo from '../Pages/PlayVideo';
import VocabLearn from '../Pages/VocabLearn';
import ViewVocab from '../Pages/ViewVocab';
import CourseList from '../Pages/CourseList';
import VideoCourseList from '../Components/VideoCourseList';
const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="ViewVocab" component={ViewVocab} />
        <Stack.Screen name="play-video" component={PlayVideo} />
        <Stack.Screen name="CourseList" component={CourseList} />
        <Stack.Screen name="VocabLearn" component={VocabLearn} />
        <Stack.Screen name="VideoCourseList" component={VideoCourseList} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
