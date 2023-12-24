// MainTab.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import ViewVocab from './ViewVocab';
import CourseList from './CourseList';
import VocabLearn from './VocabLearn';
import VideoCourseList from '../Components/VideoCourseList';
import Profile from './Profile';
import ListTopic from './ListTopic';
import VocabReview from './VocabReview';
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'home':
              iconName = 'home';
              break;
            case 'ViewVocab':
              iconName = 'book';
              break;
            case 'Vocablearn':
              iconName = 'menu';
              break;
            // case 'VideoCourseList':
            //   iconName = 'menu';
            //   break;
            // Add more cases for other tabs if needed
            default:
              iconName = 'menu';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#679dda',
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="ViewVocab" component={ViewVocab} />
      <Tab.Screen name="ListTopic" component={ListTopic} />

      <Tab.Screen name="VocabReview" component={VocabReview} />
      <Tab.Screen name="VideoCourseList" component={VideoCourseList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTab;
