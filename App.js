import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import Signup from './App/Pages/Signup';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './App/Navigations/HomeNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import MainTab from './App/Pages/MainTab';
export default function App() {

  const [userData,setUserData]=useState();
  const [isLogin,setisLogin]=useState(false)
  const [token,settoken]=useState("")
  useEffect(()=>{
      async function loadtoken(){
        const tmp=await AsyncStorage.getItem('token')
        console.log(tmp)
        
        if(tmp) {
          setisLogin(true)
          // settoken(tmp)
        } else {
          setisLogin(false)
        }
        
      }
      loadtoken()

  },[isLogin])
  const Stack=createNativeStackNavigator()
  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{ userData, setUserData, isLogin, setisLogin }}>
        <NavigationContainer>
          {isLogin ? (
            <MainTab />
          ) : (
            <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: 'slide_from_bottom' }}>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F6F8FC',
    
  },
});
