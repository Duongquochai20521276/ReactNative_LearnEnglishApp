// MainTab.js
import React,{useContext,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import ViewVocab from './ViewVocab';
import CourseList from './CourseList';
import VocabLearn from './VocabLearn';
import VideoCourseList from '../Components/VideoCourseList';
import Profile from './Profile';
import { AuthContext } from '../Context/AuthContext';
import ListTopic from './ListTopic';
import VocabReview from './VocabReview';
import ListWordUser from './ListWordUser';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const {setUserData}=useContext(AuthContext)
  const getUserData=async() =>{
    let tmp = await AsyncStorage.getItem('userdata');
    tmp=JSON.parse(tmp)
    setUserData(tmp)
    console.log(tmp)
  }
  useEffect(()=>{
    getUserData()
  },[])
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
            case 'VocabReview':
              iconName = 'caret-forward-outline';
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
        headerShown:false
      })}>
      <Tab.Screen name="home" component={Home} options={{title:'Trang chủ'}}/>
      <Tab.Screen name="ViewVocab" component={ViewVocab} options={{title:'Danh sách'}}/>
      <Tab.Screen name="ListTopic" component={ListTopic} options={{title:'Chủ đề'}}/>
      <Tab.Screen name="VocabReview" component={VocabReview} options={{title:'Ôn tập'}}/>
      {/* <Tab.Screen name="VideoCourseList" component={VideoCourseList} /> */}
      <Tab.Screen name="Profile" component={Profile} options={{title:'Tài khoản-'}}/>
    </Tab.Navigator>
  );
};

export default MainTab;
