import { View, Text, Image, StyleSheet,TextInput,TouchableOpacity,Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useContext, useEffect, useState } from 'react'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace'
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { AuthContext } from '../Context/AuthContext';
export default SignUp=({navigation}) =>{
    const [showPassword,setshowPassword]=useState(false)
    const [showconfirmPassword,setshowconfirmPassword]=useState(false)
    const [email,setemail]=useState("")
    const[password,setpassword]=useState('')
    const[confirmpassword,setconfirmpassword]=useState('')
    const [username,setusername]=useState('')
    const {settoken,setUserData}=useContext(AuthContext)
    

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password,username:username})
    };
    
    function validateEmail(email) {
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      }

    const signUp=()=>{
        if(username=='') {
            Alert.alert('Notification!','User name is invalid!')
        } else
        if(password!=confirmpassword) {
            Alert.alert('Notification!','The confirm password is incorrect!')
        } else if(!validateEmail(email)) {
            Alert.alert('Notification!','The email is incorrect!')
        } 
        else {
            
            fetch("http://192.168.2.46:3000/signup",options)
              .then(res=>res.json())
              .then(async data=>{
                console.log(data)
                try{
                    await AsyncStorage.setItem('token',data.token)
                    Alert.alert('Dang ky thanh cong:','Chuc mung ban da dang ky thanh cong!')
                    setUserData({
                        name:username,
                        picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                        email:email,
                        id:data.id
                     })
                } catch (e) {
                    Alert.alert('Loi luu token: ',e)
                }
              })
            

        }
        
    }

    return(
        <View style={styles.container}>
            <Text style={styles.Title}>SIGN UP</Text>
            <View style={styles.box_type}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.input}
                value={email}
                placeholder='Enter your email'
                keyboardType='email-address'
                onChangeText={(text)=>{setemail(text)}}
                />
            </View>
            <View style={styles.box_type}>
                <Text style={styles.label}>User name</Text>
                <TextInput
                style={styles.input}
                value={username}
                placeholder='Enter your username'
                keyboardType='email-address'
                onChangeText={(text)=>{setusername(text)}}
                />
            </View>
            <View style={styles.box_type}>
                
                <Text style={styles.label}>Password</Text>
                <View style={{flexDirection:'row',borderWidth:1,height:'100%',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <TextInput
                    secureTextEntry={showPassword?false:true}
                    value={password}
                    placeholder='Enter your password'
                    onChangeText={(text)=>{setpassword(text)}}
                    />

                    <MaterialCommunityIcons  
                    name={showPassword?'eye':'eye-off'} 
                    size={20} color='gray' 
                    style={styles.eye} 
                    onPress={()=>{setshowPassword(!showPassword)}}/>
                </View>
            </View>
            <View style={styles.box_type}>
                
                <Text style={styles.label}>Confirm Password</Text>
                <View style={{flexDirection:'row',borderWidth:1,height:'100%',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <TextInput
                    secureTextEntry={showconfirmPassword?false:true}
                    value={confirmpassword}
                    placeholder='Confirm your password'
                    onChangeText={(text)=>{setconfirmpassword(text)}}
                    />

                    <MaterialCommunityIcons  
                    name={showconfirmPassword?'eye':'eye-off'} 
                    size={20} color='gray' 
                    style={styles.eye} 
                    onPress={()=>{setshowconfirmPassword(!showconfirmPassword)}}/>
                </View>
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={()=>signUp()}>
                <Text style={{fontSize:25,fontWeight:700}}>Sign up</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',gap:5}}>
                <Text style={{fontSize:16}}>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={{color:'blue',fontSize:16}} >
                        Login now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    box_type:{
        flexDirection:'column',
        width:'100%',
        height:50,
        marginBottom:20,
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
        height:'100%'
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
    }
})