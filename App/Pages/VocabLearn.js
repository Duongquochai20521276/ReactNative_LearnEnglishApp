import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Flashcard from '../Components/Flashcard';
const VocabLearn = ({ route }) => {
  // Ensure that route and route.params are defined
  if (!route || !route.params) {
    // Handle the case where route or route.params is undefined
    return (
      <View style={styles.container}>
        <Text>Error: Invalid navigation</Text>
      </View>
    );
  }

  const { courseName } = route.params;

  const vocabularyList = {
    School: [
      { id: 1, word: 'Book', meaning: 'Sách' },
      { id: 2, word: 'Pen', meaning: 'Bút' },
      { id: 3, word: 'Teacher', meaning: 'Giáo viên' },
      { id: 4, word: 'Student', meaning: 'Học sinh' },
      { id: 5, word: 'Classroom', meaning: 'Phòng học' },
      { id: 6, word: 'Board', meaning: 'Bảng (đen)' },
      { id: 7, word: 'Desk', meaning: 'Bàn học' },
      { id: 8, word: 'Chair', meaning: 'Ghế' },
      { id: 9, word: 'Library', meaning: 'Thư viện' },
      { id: 10, word: 'Notebook', meaning: 'Sổ tay' },
      { id: 11, word: 'Pencil', meaning: 'Bút chì' },
      { id: 12, word: 'Study', meaning: 'Học' },
      { id: 13, word: 'Learn', meaning: 'Học (kiến thức)' },
      { id: 14, word: 'Homework', meaning: 'Bài tập về nhà' },
      { id: 15, word: 'Test', meaning: 'Kiểm tra' },
      { id: 16, word: 'Grade', meaning: 'Điểm số' },
      { id: 17, word: 'Backpack', meaning: 'Cặp sách' },
      { id: 18, word: 'Schoolbag', meaning: 'Cặp học sinh' },
      { id: 19, word: 'Classmate', meaning: 'Bạn học' },
      { id: 20, word: 'Subject', meaning: 'Môn học' },
    ],
    Environment: [
      { id: 1, word: 'Tree', meaning: 'Cây' },
      { id: 2, word: 'River', meaning: 'Sông' },
      { id: 3, word: 'Sun', meaning: 'Mặt trời' },
      { id: 4, word: 'Flower', meaning: 'Bông hoa' },
      { id: 5, word: 'Mountain', meaning: 'Núi' },
      { id: 6, word: 'Ocean', meaning: 'Đại dương' },
      { id: 7, word: 'Sky', meaning: 'Bầu trời' },
      { id: 8, word: 'Cloud', meaning: 'Đám mây' },
      { id: 9, word: 'Rain', meaning: 'Mưa' },
      { id: 10, word: 'Wind', meaning: 'Gió' },
      { id: 11, word: 'Beach', meaning: 'Bãi biển' },
      { id: 12, word: 'Park', meaning: 'Công viên' },
      { id: 13, word: 'Forest', meaning: 'Rừng' },
      { id: 14, word: 'Lake', meaning: 'Hồ' },
      { id: 15, word: 'Earth', meaning: 'Trái đất' },
      { id: 16, word: 'Environmental', meaning: 'Môi trường' },
      { id: 17, word: 'Recycle', meaning: 'Tái chế' },
      { id: 18, word: 'Pollution', meaning: 'Ô nhiễm' },
      { id: 19, word: 'Conservation', meaning: 'Bảo tồn' },
      { id: 20, word: 'Eco-friendly', meaning: 'Thân thiện với môi trường' },
    ],
    Family: [
      { id: 1, word: 'Mother', meaning: 'Mẹ' },
      { id: 2, word: 'Father', meaning: 'Bố' },
      { id: 3, word: 'Brother', meaning: 'Anh trai' },
      { id: 4, word: 'Sister', meaning: 'Em gái' },
      { id: 5, word: 'Grandmother', meaning: 'Bà' },
      { id: 6, word: 'Grandfather', meaning: 'Ông' },
      { id: 7, word: 'Aunt', meaning: 'Dì' },
      { id: 8, word: 'Uncle', meaning: 'Chú' },
      { id: 9, word: 'Cousin', meaning: 'Anh em họ' },
      { id: 10, word: 'Nephew', meaning: 'Cháu trai' },
      { id: 11, word: 'Niece', meaning: 'Cháu gái' },
      { id: 12, word: 'Husband', meaning: 'Chồng' },
      { id: 13, word: 'Wife', meaning: 'Vợ' },
      { id: 14, word: 'Son', meaning: 'Con trai' },
      { id: 15, word: 'Daughter', meaning: 'Con gái' },
      { id: 16, word: 'Family', meaning: 'Gia đình' },
      { id: 17, word: 'Love', meaning: 'Tình yêu' },
      { id: 18, word: 'Home', meaning: 'Nhà' },
      { id: 19, word: 'Parents', meaning: 'Bố mẹ' },
      { id: 20, word: 'Child', meaning: 'Đứa trẻ' },
    ],
    Food: [
      { id: 1, word: 'Rice', meaning: 'Gạo' },
      { id: 2, word: 'Bread', meaning: 'Bánh mì' },
      { id: 3, word: 'Fruit', meaning: 'Trái cây' },
      { id: 4, word: 'Vegetable', meaning: 'Rau củ' },
      { id: 5, word: 'Meat', meaning: 'Thịt' },
      { id: 6, word: 'Fish', meaning: 'Cá' },
      { id: 7, word: 'Chicken', meaning: 'Gà' },
      { id: 8, word: 'Beef', meaning: 'Bò' },
      { id: 9, word: 'Pork', meaning: 'Thịt lợn' },
      { id: 10, word: 'Soup', meaning: 'Súp' },
      { id: 11, word: 'Salad', meaning: 'Sa lát' },
      { id: 12, word: 'Dessert', meaning: 'Tráng miệng' },
      { id: 13, word: 'Drink', meaning: 'Đồ uống' },
      { id: 14, word: 'Coffee', meaning: 'Cà phê' },
      { id: 15, word: 'Tea', meaning: 'Trà' },
      { id: 16, word: 'Water', meaning: 'Nước' },
      { id: 17, word: 'Breakfast', meaning: 'Bữa sáng' },
      { id: 18, word: 'Lunch', meaning: 'Bữa trưa' },
      { id: 19, word: 'Dinner', meaning: 'Bữa tối' },
      { id: 20, word: 'Snack', meaning: 'Đồ ăn vặt' },
    ],
  };

  // Ensure that courseName is a valid key in the vocabularyList object
  if (!vocabularyList.hasOwnProperty(courseName)) {
    // Handle the case where courseName is invalid
    return (
      <View style={styles.container}>
        <Text>Error: Invalid courseName</Text>
      </View>
    );
  }

  const selectedVocabularyList = vocabularyList[courseName];
  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>{courseName}</Text>
      <Flashcard vocabularyList={selectedVocabularyList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseName: {
    paddingTop: 100,
    fontSize: 24, // Đặt kích thước chữ mong muốn
    fontWeight: 'bold', // Chữ in đậm
    color: 'red', // Màu đỏ
    textAlign: 'center', // Căn giữa
  },
});

export default VocabLearn;
