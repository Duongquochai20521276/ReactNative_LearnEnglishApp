import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../Context/AuthContext'

const userData = [
  { email: 'example@email.com', username: 'example_user', password: '********' },
  // Thêm thông tin người dùng khác nếu cần
];

const Profile = () => {
  return (
    <View style={styles.container}>
      {userData.map((user, index) => (
        <View key={index} style={styles.userContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.username}</Text>

          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>{user.password}</Text>
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
