import React , {useContext}from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { AuthContext } from '../Context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';  

// const userDatas = [
//   { email: 'example@email.com', username: 'example_user', password: '********' },
//   // Thêm thông tin người dùng khác nếu cần
// ];

const Profile = ({navigation}) => {
  const {userData,setUserData,setisLogin,lists,setlists,settoken,token}=useContext(AuthContext)
  let userDatas
  if(token!='000'){
    userDatas=[userData]
  }else{
    userDatas=[{email:'empty',name:'guest'}]
  }
  console.log(userData)
  return (
    <View style={styles.container}>
      {userDatas.map((user, index) => (
        <View key={index} style={styles.userContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Tên tài khoản:</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Button
            onPress={()=>{AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('userdata')
            setUserData({})
            setlists([])
            setisLogin(false)
            settoken("")}}
            title="Đăng xuất"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />  
          
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FC',
  },
  userContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
});

export default Profile;
