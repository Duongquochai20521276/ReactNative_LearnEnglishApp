import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-native'
import Services from '../Shared/Services'
import { AuthContext } from '../Context/AuthContext'
import WelcomeHeader from '../Components/WelcomeHeader'
import SearchBar from '../Components/SearchBar'
import GlobalApi from '../Shared/GlobalApi'
import VideoCourseList from '../Components/VideoCourseList'
import CourseList from '../Components/CourseList'
import { ScrollView } from 'react-native'
import Translate from '../Components/Translate'


export default function Home({navigation}) {
    const {userData,setUserData}=useContext(AuthContext)
   
  return (
    <ScrollView style={{padding:20}}>
        <WelcomeHeader />
        <SearchBar/>
        <Translate/>
        <VideoCourseList/>
        <CourseList type={'basic'} />
        <CourseList type={'advance'} />
        <View style={{height:100}}> 
          
        </View>
    </ScrollView> 
  )
}