// Import các thành phần cần thiết từ React và React Native
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Dữ liệu mẫu về khóa học
const coursesData = [
  { id: 1, title: 'React Native Basics' },
  { id: 2, title: 'Advanced JavaScript' },
  { id: 3, title: 'Mobile App Design' },
  // Thêm các khóa học khác nếu cần
];

// Component chính của trang CourseList
const CourseList = () => {
  // Sử dụng hook useNavigation để có thể chuyển hướng giữa các màn hình
  const navigation = useNavigation();

  // Hàm xử lý khi nút "Học ngay" được nhấn
  const handleLearnNow = ()  => {
    navigation.navigate('VocabLearn');
  };

  // Hàm render mỗi mục trong danh sách
  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleLearnNow()}>
        <Text style={{ color: 'blue', marginTop: 8 }}>Học ngay</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={coursesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CourseList;
