import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import CourseDetails from '../Pages/CourseDetails';
import CourseChapter from '../Pages/CourseChapter';
import PlayVideo from '../Pages/PlayVideo';
import VocabLearn from '../Pages/VocabLearn';
import ViewVocab from '../Pages/ViewVocab';
const Stack = createNativeStackNavigator();
export default function HomeNavigation({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} ></Stack.Screen>
        <Stack.Screen name="VocabLearn" component={VocabLearn} />
        <Stack.Screen name="ViewVocab" component={ViewVocab} />
        <Stack.Screen name="course-detail" component={CourseDetails} ></Stack.Screen>
        <Stack.Screen name="course-chapter"
        component={CourseChapter}/>
         <Stack.Screen name="play-video"
        component={PlayVideo}/>
    </Stack.Navigator>
  )
}