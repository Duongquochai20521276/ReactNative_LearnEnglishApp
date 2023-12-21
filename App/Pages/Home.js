import React, { useContext } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import WelcomeHeader from '../Components/WelcomeHeader';
import SearchBar from '../Components/SearchBar';
import Translate from '../Components/Translate';
import VideoCourseList from '../Components/VideoCourseList';
import { AuthContext } from '../Context/AuthContext';
import VocabLearn from '../Pages/VocabLearn';
const Home = ({ navigation }) => {
  const { userData, setUserData } = useContext(AuthContext);

  const navigateToVocabLearn = () => {
    navigation.navigate('VocabLearn'); 
  };
  const navigateToViewVocab = () => {
    navigation.navigate('ViewVocab'); 
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <WelcomeHeader />
      <SearchBar />
      <Translate />
      <VideoCourseList />
      <View style={{ height: 100 }}>
        {/* Nút để đi đến trang VocabLearn */}
        <Button title="Learn Vocabulary" onPress={navigateToVocabLearn} />
      </View>
      <View style={{ height: 100 }}>
        {/* Nút để đi đến trang VocabLearn */}
        <Button title="View your vocabulary" onPress={navigateToViewVocab} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Thêm các kiểu CSS cần thiết tại đây nếu cần
});

export default Home;
