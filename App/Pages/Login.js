import { View, Text, Image, StyleSheet,TextInput,KeyboardAvoidingView} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
import AsyncStorage from '@react-native-async-storage/async-storage';  
export default function Login({navigation}) {
    WebBrowser.maybeCompleteAuthSession();
    const [accessToken,setAccessToken]=useState();
    const [userInfo,setUserInfo]=useState();
    const {userData,setUserData,setisLogin}=useContext(AuthContext)
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     androidClientId: '55959786226-e9frfu2d60hu3lt653blch82e4rhjsnp.apps.googleusercontent.com',
    //     expoClientId:'55959786226-llk648p590tvtaoklnv4o89mtjtenecr.apps.googleusercontent.com'       
    //   });

    //   useEffect(()=>{
    //     if(response?.type=='success')
    //     {
    //         setAccessToken(response.authentication.accessToken);
           
    //         getUserData();
    //     }
    //   },[response]);

    //   const getUserData=async()=>{
    //     try {
    //         const resp = await fetch(
    //           "https://www.googleapis.com/userinfo/v2/me",
    //           {
    //             headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
    //           }
    //         );
      
    //         const user = await resp.json();
    //         console.log("user Details",user) 
    //         setUserInfo(user); 
    //         setUserData(user);
    //         await Services.setUserAuth(user);
    //       } catch (error) {
    //         // Add your own error handler here
    //       }
    //   }
      const [showPassword,setshowPassword]=useState(false)
  return (
    <KeyboardAvoidingView behavior='position'>
        
        <Image source={require('./../Assets/Images/login.png')} />
        
        <View style={styles.container}>

             <Text style={styles.welcomeText}>Welcome to CodeBox</Text>
            <View style={styles.box_type}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.input}
                placeholder='Enter your email'
                keyboardType='email-address'
                />
            </View>
            <View style={styles.box_type}>
                
                <Text style={styles.label}>Password</Text>
                <View style={{flexDirection:'row',borderWidth:1,height:'100%',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <TextInput
                    secureTextEntry={showPassword?false:true}
                    placeholder='Enter your password'
                    />

                    <MaterialCommunityIcons  
                    name={showPassword?'eye':'eye-off'} 
                    size={20} color='gray' 
                    style={styles.eye} 
                    onPress={()=>{setshowPassword(!showPassword)}}/>
                </View>
            </View>
            <TouchableOpacity style={styles.btnLogin}>
                <Text style={{fontSize:25,fontWeight:700}}>Login</Text>
            </TouchableOpacity>
            
            <View style={{flexDirection:'row',gap:5,marginBottom:20}}>
                <Text style={{fontSize:16}}>
                    Don't have an account? 
                </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}>
                    <Text style={{color:'blue',fontSize:16}} >
                        Signup now
                    </Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={()=>{

                async function savetmptoken(){
                    await AsyncStorage.setItem('token','000')
                }
                savetmptoken()
                setUserData({
                    name:'DQHAI',
                    picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                    email:'rahul@gmail.com',
                    id:0
                 })
                 setisLogin(true)
            }}>
            <Text style={{fontSize:20,color:'gray'}}>{'Skip>>'}</Text>
            </TouchableOpacity>
        
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        marginTop:-25,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        paddingHorizontal:5
    },
    welcomeText:{
        fontSize:35,
        textAlign:'center',
        fontWeight:'bold' 
    },
    button:{
        backgroundColor:Colors.primary,
        padding:10,
        margin:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    box_type:{
      flexDirection:'column',
      width:'100%',
      height:50,
      marginBottom:50,


  },
  Title:{
      fontSize:40,
      fontWeight:800,
      marginBottom:100
  },
  input:{
      borderWidth:1,
      padding:5,
      height:'100%',
      justifyContent:'center'
  },
  label:{

      fontSize:20
  },
  btnLogin:{
      backgroundColor:'blue',
      borderRadius:5,
      width:'100%',
      height:50,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10
  },
  eye:{
   

  }
})