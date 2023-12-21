// src/components/Profile.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://example.com/your-avatar-image.jpg' }}
      />
      <Text style={styles.username}>Your Username</Text>
      <Text style={styles.bio}>A short bio about yourself</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Profile;
