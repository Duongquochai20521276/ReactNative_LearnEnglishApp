import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Search from '../Components/Search';
// const SchoolVocabulary = [
//   { id: 1, word: 'Book', meaning: 'Sách' },
//   { id: 2, word: 'Pen', meaning: 'Bút' },
//   { id: 3, word: 'Teacher', meaning: 'Giáo viên' },
//   { id: 4, word: 'Student', meaning: 'Học sinh' },
//   { id: 5, word: 'Classroom', meaning: 'Phòng học' },
//   { id: 6, word: 'Board', meaning: 'Bảng (đen)' },
//   { id: 7, word: 'Desk', meaning: 'Bàn học' },
//   { id: 8, word: 'Chair', meaning: 'Ghế' },
//   { id: 9, word: 'Library', meaning: 'Thư viện' },
//   { id: 10, word: 'Notebook', meaning: 'Sổ tay' },
//   { id: 11, word: 'Pencil', meaning: 'Bút chì' },
//   { id: 12, word: 'Study', meaning: 'Học' },
//   { id: 13, word: 'Learn', meaning: 'Học (kiến thức)' },
//   { id: 14, word: 'Homework', meaning: 'Bài tập về nhà' },
//   { id: 15, word: 'Test', meaning: 'Kiểm tra' },
//   { id: 16, word: 'Grade', meaning: 'Điểm số' },
//   { id: 17, word: 'Backpack', meaning: 'Cặp sách' },
//   { id: 18, word: 'Schoolbag', meaning: 'Cặp học sinh' },
//   { id: 19, word: 'Classmate', meaning: 'Bạn học' },
//   { id: 20, word: 'Subject', meaning: 'Môn học' },
// ];
let SchoolVocabulary = [
  {word: 'Book', meaning: 'Sách' },
  {word: 'Pen', meaning: 'Bút' },
  {word: 'Teacher', meaning: 'Giáo viên' },
  {word: 'Student', meaning: 'Học sinh' },
  {word: 'Classroom', meaning: 'Phòng học' },
  {word: 'Board', meaning: 'Bảng (đen)' },
  {word: 'Desk', meaning: 'Bàn học' },
  {word: 'Chair', meaning: 'Ghế' },
  {word: 'Library', meaning: 'Thư viện' },
  {word: 'Notebook', meaning: 'Sổ tay' },
  {word: 'Pencil', meaning: 'Bút chì' },
  {word: 'Study', meaning: 'Học' },
  {word: 'Learn', meaning: 'Học (kiến thức)' },
  {word: 'Homework', meaning: 'Bài tập về nhà' },
  {word: 'Test', meaning: 'Kiểm tra' },
  {word: 'Grade', meaning: 'Điểm số' },
  {word: 'Backpack', meaning: 'Cặp sách' },
  {word: 'Schoolbag', meaning: 'Cặp học sinh' },
  {word: 'Classmate', meaning: 'Bạn học' },
  {word: 'Subject', meaning: 'Môn học' },
];
const VocabReview = ({route,navigation}) => {
    if(route.params) {
      if(route.params.item.words.length==0){
        console.log('Empty')
      }else {
        SchoolVocabulary=[]
        for (let i = 0; i < route.params.item.words.length; i+=2) {
          SchoolVocabulary=[...SchoolVocabulary,{word:route.params.item.words[i],meaning:route.params.item.words[i+1]}]
        }
        console.log(SchoolVocabulary)
      }
    }else{ 
      return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Bạn chưa tiến hành ôn tập</Text></View>
    } 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState(''); 
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [showSearchComponent, setShowSearchComponent] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [incorrectCount, setIncorrectCount] = useState(0);
  
    useEffect(() => {
      // Xử lý khi giá trị của isCorrect thay đổi
      if (isCorrect) {
        const timeout = setTimeout(() => {
          setIsCorrect(false); // Đặt lại giá trị isCorrect sau 1 giây
          handleNextWord();
        }, 1000);
  
        // Clear hẹn giờ khi component bị hủy
        return () => clearTimeout(timeout);
      }
    }, [isCorrect]);
  
    const handleCheckAnswer = () => {
      const currentVocab = SchoolVocabulary[currentIndex];
      if (userAnswer.toLowerCase() === currentVocab.word.toLowerCase()) {
        setIsCorrect(true);
      } else {
        setCorrectAnswer(currentVocab.word);
        setIncorrectCount(incorrectCount + 1); // Tăng số lần nhập sai khi sai
        Alert.alert('Sai', 'Hãy nhập lại...');
      }
    };
  
    const handleNextWord = () => {
      if (currentIndex < SchoolVocabulary.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setShowSearchComponent(false);
        setIncorrectCount(0); // Reset lại số lần nhập sai khi chuyển sang từ tiếp theo
      } else {
        Alert.alert('Hoàn thành ôn tập', 'Bạn đã ôn tập xong danh sách từ vựng.');
        // Handle completion actions
      }
    };
  
    const handleShowAnswer = () => {
      Alert.alert('Đáp án', `Đáp án là: ${SchoolVocabulary[currentIndex].word}`);
    };
  
    const renderSearchComponent = () => {
      return showSearchComponent ? <Search initialKeyword={SchoolVocabulary[currentIndex].word} /> : null;
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.meaning}>{SchoolVocabulary[currentIndex].meaning}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserAnswer(text)}
          onBlur={()=>{setUserAnswer('')}}
          value={userAnswer}
          placeholder="Nhập từ tiếng Anh"
        />
        <View style={styles.button}>
          <Button title="Kiểm tra" onPress={handleCheckAnswer} />
          <Button title="Gợi ý" onPress={() => setShowSearchComponent(true)} />
          <Button title="Xem đáp án" onPress={handleShowAnswer} />
        </View>
        {isCorrect && <Text style={{color:'green'}}>Chính xác!</Text>}
        {renderSearchComponent()}
      </View>
    );
  };

const styles = StyleSheet.create({
    button:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meaning: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
});

export default VocabReview;
