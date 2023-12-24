import { View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CourseDetails from '../Pages/CourseDetails';
export default function VideoCourseList() {
  const navigation = useNavigation();

  const videoList = [
    {
      id: 1,
      name: 'Video 1',
      description: 'Luyện nghe tiếng Anh giao tiếp cơ bản',
      videoUrl: 'https://www.youtube.com/watch?v=H2x5Y65SO9w&list=PLUwC1OA3ls0ExHR7reLzrkRQthF3I0O23',
      backgroundImage: require('./../Assets/Images/400cau.png'), // Use require for local images
    },
    {
      id: 2,
      name: 'Video 2',
      description: '400 câu tiếng Anh thông dụng',
      videoUrl: 'https://www.youtube.com/watch?v=xXdgrKexnHI&list=PLUwC1OA3ls0ExHR7reLzrkRQthF3I0O23&index=2',
      backgroundImage: require('./../Assets/Images/400cau.png'),
    },
    // Add more videos as needed
  ];

  const onPressCourse = (course) => {
    navigation.navigate('CourseDetails', {
      courseData: course,
      courseType: 'video',
    });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>
        Video Course
      </Text>
      <FlatList
        data={videoList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressCourse(item)}>
            <ImageBackground
              source={item.backgroundImage}
              style={{
                width: 210,
                height: 120,
                marginRight: 10,
                borderRadius: 7,
              }}
              imageStyle={{ borderRadius: 7 }}
            >
              {/* You can add additional UI components here, such as text overlay */}
              <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: 'white' }}>{item.description}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
