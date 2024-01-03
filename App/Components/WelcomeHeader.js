import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';  


export default function WelcomeHeader() {
    const {userData,setUserData,setisLogin,lists,setlists,settoken}=useContext(AuthContext)
    console.log(userData)
  return (
    <View style={styles.container}>
        <View>
        <Text>Hello,</Text>
         <Text style={{fontSize:20,fontWeight:'bold'}}>{userData?.name}</Text>
        </View>
        <Image source={{uri:userData?.picture}}
        style={{width:40,height:40,borderRadius:100}}
        />
      <TouchableOpacity onPress={()=>{
        
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('userdata')
        setUserData({})
        setlists([])
        setisLogin(false)
        settoken("")
      }}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
        container:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }
})