import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './App/Pages/Login';
import Signup from './App/Pages/Signup';
import { AuthContext } from './App/Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import MainTab from './App/Pages/MainTab';
import HomeNavigation from './App/Navigations/HomeNavigation';
export default function App() {
  const [userData, setUserData] = useState();
  const [isLogin, setisLogin] = useState(false);
  // const urlApi="http://192.168.48.59:3000"
  const urlApi="http://192.168.2.46:3000"
  const [token,settoken]=useState("")
  const[lists,setlists]=useState([])
  const[ischange,setischange]=useState(false)
  useEffect(() => {
    async function loadToken() {
      const tmp = await AsyncStorage.getItem('token');
      console.log(tmp);
      settoken(tmp) 
      setisLogin(!!tmp); // Set isLogin to true if token exists, false otherwise
    }
    loadToken();
  }, []); // Only run this effect once on initial render

  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{ ischange,setischange,userData, setUserData, isLogin, setisLogin , urlApi,token,settoken,lists,setlists}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ animation: 'slide_from_bottom' }}>
            {isLogin ? (             
              <Stack.Screen name="HomeNavigation" component={HomeNavigation} options={{ headerShown: false }} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
});
