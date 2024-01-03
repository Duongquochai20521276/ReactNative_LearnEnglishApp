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
    const {settoken,setUserData,urlApi}=useContext(AuthContext)
    

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
            Alert.alert('Thông báo!','Tên tài khoản không được để trống!')
        } else
        if(password!=confirmpassword) {
            Alert.alert('Thông báo!','Mật khẩu nhập lại không đúng!')
        } else if(!validateEmail(email)) {
            Alert.alert('Thông báo!','Email không hợp lệ!')
        } 
        else {
            
            fetch(urlApi+"/signup",options)
              .then(res=>res.json())
              .then(async data=>{
                console.log(data)
                try{
                    await AsyncStorage.setItem('token',data.token)
                    Alert.alert('Đăng ký thành công:','Chúc mừng bạn đã đăng ký thành công!')
                    setUserData({
                        name:username,
                        picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                        email:email,
                        id:data.id
                     })
                     navigation.navigate('Login')
                } catch (e) {
                    Alert.alert('Loi luu token: ',e.message)
                }
              })
            

        }
        
    }

    return(
        <View style={styles.container}>
            <Text style={styles.Title}>Đăng ký</Text>
            <View style={styles.box_type}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.input}
                value={email}
                placeholder='Nhập email'
                keyboardType='email-address'
                onChangeText={(text)=>{setemail(text)}}
                />
            </View>
            <View style={styles.box_type}>
                <Text style={styles.label}>Tên tài khoản</Text>
                <TextInput
                style={styles.input}
                value={username}
                placeholder='Nhập tên tài khoản'
                keyboardType='email-address'
                onChangeText={(text)=>{setusername(text)}}
                />
            </View>
            <View style={styles.box_type}>
                
                <Text style={styles.label}>Mật khẩu</Text>
                <View style={{flexDirection:'row',borderWidth:1,height:'100%',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <TextInput
                    secureTextEntry={showPassword?false:true}
                    value={password}
                    placeholder='Nhập mật khẩu'
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
                
                <Text style={styles.label}>Xác nhận mật khẩu</Text>
                <View style={{flexDirection:'row',borderWidth:1,height:'100%',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <TextInput
                    secureTextEntry={showconfirmPassword?false:true}
                    value={confirmpassword}
                    placeholder='Nhập lại mật khẩu'
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
                <Text style={{fontSize:25,fontWeight:700}}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',gap:5}}>
                <Text style={{fontSize:16}}>
                    Đã có tài khoản?
                </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={{color:'blue',fontSize:16}} >
                        Đăng nhập ngay
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